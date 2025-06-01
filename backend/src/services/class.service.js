import Class from '../models/Class.model.js';
import Lecturer from '../models/Lecturer.model.js';
import Attendance from '../models/Attendance.model.js';
import NotificationService from '../services/notification.service.js';
import Student from '../models/Student.model.js';
import sequelize from '../common/sequelize/connect.sequelize.js'; // Import sequelize for Op
import { sendMail } from '../common/nodemailer/send-mail.nodemailer.js';
import { Op } from 'sequelize';
import StudentIntakeModule from '../models/StudentIntakeModule.model.js';
import IntakeModules from '../models/IntakeModules.model.js';

const classService = {
    // Check for scheduling conflicts
    checkScheduleConflict: async (classData) => {
        const conflict = await Class.findOne({
            where: {
                class_date: classData.class_date,
                intake_module_id: classData.intake_module_id,
                [Op.or]: [
                    {
                        start_time: { [Op.between]: [classData.start_time, classData.end_time] },
                    },
                    {
                        end_time: { [Op.between]: [classData.start_time, classData.end_time] },
                    },
                    {
                        start_time: { [Op.lte]: classData.start_time },
                        end_time: { [Op.gte]: classData.end_time },
                    },
                ],
            },
        });
        return !!conflict; // Return true if a conflict is found
    },

    // Create a new class (Admin)
    createClass: async (classData) => {
        const conflictExists = await classService.checkScheduleConflict(classData); // Corrected to use classData
        if (conflictExists) {
            throw new Error('Schedule conflict detected');
        }
        
        const newClass = await Class.create(classData);
        
        // Notify students and lecturer about the new class
        // try {
        //     await NotificationService.sendClassCreationNotification(newClass);
        // } catch (notificationError) {
        //     console.error('Failed to send class creation notification:', notificationError);
        // }

        // // Send email notification for class creation
        // await sendMail({
        //     to: 'student@example.com', // Replace with list of student emails
        //     subject: 'New Class Created',
        //     text: `A new class ${newClass.className} has been scheduled.`,
        //     html: `<p>A new class <b>${newClass.className}</b> has been scheduled.</p>`
        // });

        return newClass;
    },

    // View all classes (Admin/Faculty Assistant)
    viewClasses: async () => {
        return await Class.findAll();
    },

    // View classes by lecturer (Lecturer/Admin/Faculty Assistant)
    viewClassesByLecturer: async (lecturerId) => {
        return await Class.findAll({ where: { lecturer_id: lecturerId } });
    },

    // View classes by module (Admin/Faculty Assistant)
    viewClassesByIntakeModule: async (intakeModuleId) => {
        return await Class.findAll({ where: { intake_module_id: intakeModuleId } });
    },

    // Assign lecturer to a class (Admin/Faculty Assistant)
    assignLecturerToClass: async (classId, lecturerId) => {
        const lecturer = await Lecturer.findByPk(lecturerId);
        if (!lecturer) {
            throw new Error('Lecturer not found');
        }
        return await Class.update({ lecturer_id: lecturerId }, { where: { class_id: classId } });
    },

    // Assign students to a class (Admin/Faculty Assistant)
    assignStudentsToClass: async (classId, studentIds) => {
        const students = await Student.findAll({ where: { student_id: studentIds } });
        if (students.length !== studentIds.length) {
            throw new Error('Some students not found');
        }
        const classEntity = await Class.findByPk(classId);
        if (!classEntity) {
            throw new Error('Class not found');
        }
        await classEntity.addStudents(students);
        return classEntity;
    },

    // Updates a class by class_id (Admin/Faculty Assistant)
    updateClass: async (classId, updatedData) => {
        try {
            // First check if the class exists
            const existingClass = await Class.findByPk(classId);
            if (!existingClass) {
                throw new Error('Class not found');
            }

            // Check for scheduling conflicts
            const conflictExists = await classService.checkScheduleConflict({
                ...updatedData,
                class_id: classId
            });
            if (conflictExists) {
                throw new Error('Schedule conflict detected');
            }

            // Update the class
            await Class.update(updatedData, { 
                where: { class_id: classId },
                returning: true
            });

            // Fetch the updated class
            const updatedClass = await Class.findByPk(classId);
            if (!updatedClass) {
                throw new Error('Failed to retrieve updated class');
            }

            // Send email notification for class update
            try {
                await sendMail({
                    to: 'student@example.com', // Replace with list of student emails
                    subject: 'Class Updated',
                    text: `Class ${updatedData.className} has been updated.`,
                    html: `<p>Class <b>${updatedData.className}</b> has been updated.</p>`
                });
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
                // Don't throw error for email failure
            }

            return updatedClass;
        } catch (error) {
            console.error('Error in updateClass service:', error);
            throw error;
        }
    },

    // Deletes a class by class_id (Admin)
    deleteClass: async (classId) => {
        const hasDependencies = await classService.checkDependencies(classId);
        if (hasDependencies) {
            throw new Error('Cannot delete class with existing dependencies');
        }

        const result = await Class.destroy({ where: { class_id: classId } });
        if (result) {
            // Send email notification for class deletion
            await sendMail({
                to: 'student@example.com', // Replace with list of student emails
                subject: 'Class Canceled',
                text: `Class ${classId} has been canceled.`,
                html: `<p>Class <b>${classId}</b> has been canceled.</p>`
            });
        }
        return result;
    },

    // Check for dependencies before deletion
    checkDependencies: async (classId) => {
        const attendanceRecords = await Attendance.findAll({ where: { class_id: classId } });
        return attendanceRecords.length > 0; // Return true if dependencies are found
    },

    // Lecturer views student attendance for a class
    viewStudentAttendance: async (classId) => {
        const attendance = await Attendance.findAll({ where: { class_id: classId } });
        if (attendance.length === 0) {
            throw new Error('No attendance data found for this class');
        }
        return attendance;
    },

    // Lecturer views student's attendance rate for the module
    viewStudentAttendanceRate: async (moduleId) => {
        const attendances = await Attendance.findAll({ where: { intake_module_id: moduleId } });

        if (!attendances || attendances.length === 0) {
            throw new Error('No attendance data found for this module');
        }

        const totalClasses = attendances.length;
        const attendedClasses = attendances.filter(a => a.attendance_status === 'present').length;

        // Calculate attendance rate
        const attendanceRate = (attendedClasses / totalClasses) * 100;
        return attendanceRate;
    },

    // Get students enrolled in a module
    getStudentsByModule: async (moduleId) => {
        try {
            const enrolledStudents = await StudentIntakeModule.findAll({
                where: { intake_module_id: moduleId },
                include: [{
                    model: Student,
                    attributes: ['student_id', 'name', 'intake']
                }]
            });

            return enrolledStudents.map(enrollment => ({
                id: enrollment.Student.student_id,
                fullName: enrollment.Student.name,
                intake: enrollment.Student.intake.toString(),
                enrollmentDate: enrollment.enrollment_date
            }));
        } catch (error) {
            console.error('Error in getStudentsByModule:', error);
            throw error;
        }
    },

    async inviteStudentToModule(studentId, moduleId) {
        try {
            // Check if student exists
            const student = await Student.findByPk(studentId);
            if (!student) {
                throw new Error('Student not found');
            }

            // Check if module exists
            const module = await IntakeModules.findByPk(moduleId);
            if (!module) {
                throw new Error('Module not found');
            }

            // Check if student is already enrolled
            const existingEnrollment = await StudentIntakeModule.findOne({
                where: {
                    student_id: studentId,
                    intake_module_id: moduleId
                }
            });

            if (existingEnrollment) {
                throw new Error('Student is already enrolled in this module');
            }

            // Create enrollment
            const enrollment = await StudentIntakeModule.create({
                student_id: studentId,
                intake_module_id: moduleId,
                enrollment_date: new Date()
            });

            return enrollment;
        } catch (error) {
            throw error;
        }
    },

    // Get student details by ID
    getStudentById: async (studentId) => {
        try {
            const student = await Student.findByPk(studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            return student;
        } catch (error) {
            throw error;
        }
    },

    // Remove student from module
    removeStudentFromModule: async (studentId, moduleId) => {
        try {
            // Check if student is enrolled
            const enrollment = await StudentIntakeModule.findOne({
                where: {
                    student_id: studentId,
                    intake_module_id: moduleId
                }
            });

            if (!enrollment) {
                throw new Error('Student is not enrolled in this module');
            }

            // Delete the enrollment
            await enrollment.destroy();
            return { message: 'Student removed successfully' };
        } catch (error) {
            throw error;
        }
    }
};

export default classService;
