import Course from '../models/Course.model.js';
import Lecturer from '../models/Lecturer.model.js';
import Student from '../models/Student.model.js';

const courseService = {
    // Create a new course (Admin only)
    createCourse: async (courseData) => {
        return await Course.create(courseData);
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
    assignLecturerToIntakeModule: async (intakeModuleId, lecturerId) => {
        // Check if the lecturer exists
        const lecturer = await Lecturer.findByPk(lecturerId);
        if (!lecturer) {
            throw new Error('Lecturer not found');
        }
        // Assign lecturer to the intake module
        return await IntakeModule.update(
            { lecturer_id: lecturerId },
            { where: { intake_module_id: intakeModuleId } }
        );
    },

    // Assign students to an intake module (Faculty Assistant)
    assignStudentsToIntakeModule: async (intakeModuleId, studentIds) => {
        const students = await Student.findAll({ where: { student_id: studentIds } });
        if (students.length !== studentIds.length) {
            throw new Error('Some students not found');
        }
        const intakeModule = await IntakeModule.findByPk(intakeModuleId);
        if (!intakeModule) {
            throw new Error('Intake module not found');
        }
        await intakeModule.addStudents(students);
        return intakeModule;
    },

    // Create classes for an intake module (Faculty Assistant)
    createClassesForIntakeModule: async (intakeModuleId) => {
        const intakeModule = await IntakeModule.findByPk(intakeModuleId);
        if (!intakeModule) {
            throw new Error('Intake module not found');
        }
        const classes = [];
        for (let i = 1; i <= 15; i++) {
            classes.push({ intake_module_id: intakeModuleId, class_number: i });
        }
        await Class.bulkCreate(classes); // Assuming a Class model to store individual classes
        return classes;
    },


    // Update a course by course_id (Admin/Faculty Assistant)
    updateCourse: async (courseId, updatedData) => {
        return await Course.update(updatedData, { where: { course_id: courseId } });
    },

    // Delete a course by course_id (Admin only)
    deleteCourse: async (courseId) => {
        return await Course.destroy({ where: { course_id: courseId } });
    },

};

export default courseService;
