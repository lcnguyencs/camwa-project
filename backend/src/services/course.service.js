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

    // View courses by program (Admin/Faculty Assistant)
    viewCoursesByProgram: async (programId) => {
        return await Course.findAll({ where: { program_id: programId } });
    },

    // View courses by lecturer (Lecturer)
    viewCoursesByLecturer: async (lecturerId) => {
        return await Course.findAll({ where: { lecturer_id: lecturerId } });
    },

    // View courses by intake (Admin/Faculty Assistant)
    viewCoursesByIntake: async (intake) => {
        return await Course.findAll({ where: { intake } });
    },

    // Assign a lecturer to a course (Faculty Assistant)
    assignLecturerToCourse: async (courseId, lecturerId) => {
        // Check if the lecturer exists
        const lecturer = await Lecturer.findByPk(lecturerId);
        if (!lecturer) {
            throw new Error('Lecturer not found');
        }
        // Assign lecturer to the course
        return await Course.update({ lecturer_id: lecturerId }, { where: { course_id: courseId } });
    },

    // Assign students to a course (Faculty Assistant)
    assignStudentsToCourse: async (courseId, studentIds) => {
        // Check if all students exist
        const students = await Student.findAll({ where: { student_id: studentIds } });
        if (students.length !== studentIds.length) {
            throw new Error('Some students not found');
        }
        // Assign each student to the course (assuming a many-to-many relationship)
        const course = await Course.findByPk(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        await course.addStudents(students);
        return course;
    },

    // Update a course by course_id (Admin/Faculty Assistant)
    updateCourse: async (courseId, updatedData) => {
        return await Course.update(updatedData, { where: { course_id: courseId } });
    },

    // Delete a course by course_id (Admin only)
    deleteCourse: async (courseId) => {
        return await Course.destroy({ where: { course_id: courseId } });
    },

    // View courses for a student (Student)
    viewCoursesForStudent: async (studentId) => {
        return await Course.findAll({
            include: {
                model: Student,
                where: { student_id: studentId }
            }
        });
    }
};

export default courseService;
