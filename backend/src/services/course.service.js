import Course from '../models/Course.model.js';
import Lecturer from '../models/Lecturer.model.js';
import Student from '../models/Student.model.js';
import IntakeModule from '../models/IntakeModules.model.js';
import Class from '../models/Class.model.js';
import Attendance from '../models/Attendance.model.js';
import auditLogService from '../services/auditLogService.js';
import { sendMail } from '../common/nodemailer/send-mail.nodemailer.js';
import StudentIntakeModule from '../models/StudentIntakeModule.model.js';

const courseService = {
    // Create a new course (Admin only)
    createCourse: async (courseData, userId) => {
        const course = await Course.create(courseData);
        await auditLogService.logAction(userId, 'createCourse', course);
        return course;
    },

    // View all courses (Admin/Faculty Assistant)
    viewCourses: async () => {
        return await Course.findAll();
    },

    // View courses by lecturer (Lecturer)
    viewCoursesByLecturer: async (lecturerId) => {
        return await IntakeModule.findAll({
            where: { lecturer_id: lecturerId },
            include: [Course]
        });
    },

    // View intake modules by student (Student)
    viewCoursesForStudent: async (studentId) => {
        return await IntakeModule.findAll({
            include: [{
                model: Student,
                where: { student_id: studentId }
            }]
        });
    },

    // Assign a lecturer to an intake module (Faculty Assistant)
    assignLecturerToIntakeModule: async (intakeModuleId, lecturerId, userId) => {
        // Check if the lecturer exists
        const lecturer = await Lecturer.findByPk(lecturerId);
        if (!lecturer) {
            throw new Error('Lecturer not found');
        }

        // Get the lecturer's email
        // const lecturerEmail = lecturer.email;
        
        // Assign lecturer to the intake module
        const result = await IntakeModule.update(
            { lecturer_id: lecturerId },
            { where: { intake_module_id: intakeModuleId } }
        );
    
        await auditLogService.logAction(userId, 'assignLecturer', { intakeModuleId, lecturerId });
        // Send email notification to lecturer
        // await sendMail({
        //     to: lecturerEmail,  
        //     subject: 'You Have Been Assigned to a New Course',
        //     text: `You have been assigned to module ${intakeModuleId}.`,
        //     html: `<p>You have been assigned to module <b>${intakeModuleId}</b>.</p>`
        // });

        return result;
    },

    // Assign students to an intake module (Faculty Assistant)
    assignStudentsToIntakeModule: async (intakeModuleId, studentIds, userId) => {
        const students = await Student.findAll({ where: { student_id: studentIds } });
        if (students.length !== studentIds.length) {
            // Check if the number of found students matches the input studentIds
            const missingStudents = studentIds.filter(id => !students.some(student => student.student_id === id));  // Find missing students
            throw new Error(`Some students not found: ${missingStudents.join(', ')}`);
        }
        const intakeModule = await IntakeModule.findByPk(intakeModuleId);
        if (!intakeModule) {
            throw new Error('Intake module not found');
        }

        const studentIntakeModules = await Promise.all(
            studentIds.map(studentId => 
                StudentIntakeModule.create({
                    student_id: studentId,
                    intake_module_id: intakeModuleId
                })
            )
        );
    
        await auditLogService.logAction(userId, 'assignStudents', { intakeModuleId, studentIds });
        
        // Send email notification to students
        // await sendMail({
        //     to: students.map(student => student.email),  // Send email to the students' actual emails
        //     subject: 'You Have Been Enrolled in a New Course',
        //     text: `You have been enrolled in module ${intakeModuleId}.`,
        //     html: `<p>You have been enrolled in module <b>${intakeModuleId}</b>.</p>`
        // });

        return intakeModule;
    },

    checkCourseExists: async (courseName, lecturerId) => {
    try {
        const existingCourse = await Course.findOne({
            where: {
                name: courseName,
                lecturer_id: lecturerId
            }
        });
        
        return !!existingCourse; // Returns true if course exists, false otherwise
    } catch (error) {
        console.error("Error checking course existence:", error);
        throw error;
        }
    },

    // Create classes for an intake module (Admin)
    createClassesForIntakeModule: async (intakeModuleId, classCount = 15, userId) => {
        const intakeModule = await IntakeModule.findByPk(intakeModuleId);
        if (!intakeModule) {
            throw new Error('Intake module not found');
        }

        // Create classes for the intake module
        const classes = [];
        for (let i = 1; i <= classCount; i++) {
            classes.push({
                intake_module_id: intakeModuleId,
                class_number: i,
                class_date: new Date(), // Here you can set a specific date or logic for the class date
            });
        }
        // Insert all the classes into the database in bulk
        await Class.bulkCreate(classes); 

         // Optionally log the action
        await auditLogService.logAction(userId, 'createClasses', { intakeModuleId, classCount });
        
        return classes;
    },

    // Get Intake Module Analytics for Export
    getIntakeModuleAnalytics: async (intakeModuleId) => {
        // Retrieve students enrolled in the intake module
        const students = await Student.findAll({
            include: {
                model: IntakeModule,
                where: { intake_module_id: intakeModuleId }
            }
        });

        // Retrieve attendance records for each student
        const attendanceRecords = await Attendance.findAll({
            where: { intake_module_id: intakeModuleId }
        });

        // Format the data to structure attendance by student and date
        const dates = [...new Set(attendanceRecords.map(record => record.class_date))]; // Unique dates
        const studentsData = students.map(student => {
            const attendance = {};
            dates.forEach(date => {
                const record = attendanceRecords.find(
                    r => r.student_id === student.student_id && r.class_date === date
                );
                attendance[date] = record ? (record.attendance_status === 'present' ? 'present' : 'absent') : 'absent';
            });
            return {
                id: student.student_id,
                name: student.name,
                attendance
            };
        });

        return { dates, students: studentsData };
    },


    // Update a course by course_id (Admin/Faculty Assistant)
    updateCourse: async (courseId, updatedData, userId) => {
        const [affectedCount] = await Course.update(updatedData, { where: { course_id: courseId } });  // Update course in the database
        if (affectedCount === 0) {
            throw new Error('Course not found or no changes made');  // Handle case where course was not found or no changes were made
        }
        await auditLogService.logAction(userId, 'updateCourse', { courseId, updatedData });  // Log the update action with userId
        return await Course.findByPk(courseId);  // Return the updated course object
    },

    // Delete a course by course_id (Admin only)
    deleteCourse: async (courseId, userId) => {
        const affectedRows = await Course.destroy({ where: { course_id: courseId } });  // Delete course from the database
        if (affectedRows === 0) {
            throw new Error('Course not found');  // Handle case where course was not found
        }
        await auditLogService.logAction(userId, 'deleteCourse', { courseId });  // Log the deletion action with userId
        return { message: 'Course successfully deleted' };  // Return success message
    },

    // Create multiple courses from CSV file (Admin only)
    createMultipleCoursesFromCSV: async (filePath, userId) => {
        try {
            const fs = await import('fs/promises');
            
            // Check if file exists before attempting to read
            try {
                await fs.access(filePath);
                console.log(`CSV file exists at: ${filePath}`);
            } catch (fileError) {
                throw new Error(`File not found: ${filePath}`);
            }
            
            const Excel = (await import('exceljs')).default;
            const workbook = new Excel.Workbook();
            
            console.log(`Attempting to read CSV from: ${filePath}`);
            
            // Parse the CSV file
            await workbook.csv.readFile(filePath);
            const worksheet = workbook.worksheets[0];
            
            console.log(`CSV loaded successfully with ${worksheet.rowCount} rows`);
            
            const results = {
                successful: [],
                failed: []
            };
            
            // Skip the header row and process each row
            for (let i = 2; i <= worksheet.rowCount; i++) {
                const row = worksheet.getRow(i);
                const name = row.getCell(1).value?.toString();
                const lecturerId = row.getCell(2).value?.toString();
                const programId = row.getCell(3).value?.toString();
                const intake = row.getCell(4).value?.toString();
                const semesterId = row.getCell(5).value?.toString();
                
                // Skip empty rows or rows with missing required fields
                if (!name || !lecturerId || !programId || !intake || !semesterId) {
                    console.log(`Skipping row ${i} due to missing required fields`);
                    continue;
                }
                
                try {
                    // Check if course with same name and lecturer already exists
                    const courseExists = await courseService.checkCourseExists(name, lecturerId);
                    if (courseExists) {
                        results.failed.push({
                            name,
                            lecturerId,
                            error: 'Course with this name and lecturer already exists'
                        });
                        continue;
                    }
                    
                    // Create course record
                    const courseData = {
                        name: name,
                        lecturer_id: lecturerId,
                        program_id: programId,
                        intake: parseInt(intake),
                        semester_id: semesterId
                    };
                    
                    // Use the existing createCourse method
                    const newCourse = await courseService.createCourse(courseData, userId);
                    
                    results.successful.push({
                        courseId: newCourse.course_id,
                        name: newCourse.name,
                        lecturerId: newCourse.lecturer_id,
                        programId: newCourse.program_id,
                        intake: newCourse.intake,
                        semesterId: newCourse.semester_id
                    });
                } catch (error) {
                    console.error(`Error creating course at row ${i}:`, error);
                    results.failed.push({
                        name,
                        lecturerId,
                        error: error.message
                    });
                }
            }
            
            // Log the bulk creation action
            await auditLogService.logAction(
                userId, 
                'bulkCreateCourses', 
                { 
                    successCount: results.successful.length, 
                    failCount: results.failed.length 
                }
            );
            
            return results;
        } catch (error) {
            console.error('Error creating courses from CSV:', error);
            throw new Error('Error creating courses from CSV: ' + error.message);
        }
    },

    // Delete multiple courses from CSV file (Admin only)
    deleteMultipleCoursesFromCSV: async (filePath, userId) => {
        try {
            const fs = await import('fs/promises');
            
            // Check if file exists before attempting to read
            try {
                await fs.access(filePath);
                console.log(`CSV file exists at: ${filePath}`);
            } catch (fileError) {
                throw new Error(`File not found: ${filePath}`);
            }
            
            const Excel = (await import('exceljs')).default;
            const workbook = new Excel.Workbook();
            
            console.log(`Attempting to read CSV from: ${filePath}`);
            
            // Parse the CSV file
            await workbook.csv.readFile(filePath);
            const worksheet = workbook.worksheets[0];
            
            console.log(`CSV loaded successfully with ${worksheet.rowCount} rows`);
            
            const results = {
                successful: [],
                failed: []
            };
            
            // Skip the header row and process each row
            for (let i = 2; i <= worksheet.rowCount; i++) {
                const row = worksheet.getRow(i);
                const name = row.getCell(1).value?.toString();
                const lecturerId = row.getCell(2).value?.toString();
                const programId = row.getCell(3).value?.toString();
                const intake = row.getCell(4).value?.toString();
                const semesterId = row.getCell(5).value?.toString();
                
                // Skip empty rows or rows with missing critical identifiers
                if (!name || !lecturerId) {
                    console.log(`Skipping row ${i} due to missing name or lecturer_id`);
                    continue;
                }
                
                try {
                    // Find courses that match the criteria
                    const whereClause = {
                        name: name,
                        lecturer_id: lecturerId
                    };
                    
                    // Add optional filters if provided
                    if (programId) whereClause.program_id = programId;
                    if (intake) whereClause.intake = parseInt(intake);
                    if (semesterId) whereClause.semester_id = semesterId;
                    
                    // Find courses to delete first (to include in results)
                    const coursesToDelete = await Course.findAll({ where: whereClause });
                    
                    if (coursesToDelete.length === 0) {
                        results.failed.push({
                            name,
                            lecturerId,
                            programId,
                            intake,
                            semesterId,
                            error: 'No matching courses found'
                        });
                        continue;
                    }
                    
                    // Delete the courses
                    const deleteCount = await Course.destroy({ where: whereClause });
                    
                    // Record successful deletions
                    coursesToDelete.forEach(course => {
                        results.successful.push({
                            courseId: course.course_id,
                            name: course.name,
                            lecturerId: course.lecturer_id,
                            programId: course.program_id,
                            intake: course.intake,
                            semesterId: course.semester_id
                        });
                    });
                    
                    // Log each deletion
                    await auditLogService.logAction(userId, 'deleteCourseFromCSV', { 
                        criteria: whereClause, 
                        count: deleteCount 
                    });
                    
                } catch (error) {
                    console.error(`Error deleting course at row ${i}:`, error);
                    results.failed.push({
                        name,
                        lecturerId,
                        programId,
                        intake,
                        semesterId,
                        error: error.message
                    });
                }
            }
            
            // Log the bulk deletion action
            await auditLogService.logAction(
                userId, 
                'bulkDeleteCourses', 
                { 
                    successCount: results.successful.length, 
                    failCount: results.failed.length 
                }
            );
            
            return results;
        } catch (error) {
            console.error('Error deleting courses from CSV:', error);
            throw new Error('Error deleting courses from CSV: ' + error.message);
        }
    }
};

export default courseService;
