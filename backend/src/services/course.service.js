import Course from '../models/Course.model.js';

const courseService = {
    // Create a new course
    createCourse: async (courseData) => {
        return await Course.create(courseData);
    },

    // View all courses
    viewCourses: async () => {
        return await Course.findAll();
    },

    // View courses by program
    viewCoursesByProgram: async (programId) => {
        return await Course.findAll({ where: { program_id: programId } });
    },

    // View courses by lecturer
    viewCoursesByLecturer: async (lecturerId) => {
        return await Course.findAll({ where: { lecturer_id: lecturerId } });
    },

    // View courses by intake
    viewCoursesByIntake: async (intake) => {
        return await Course.findAll({ where: { intake } });
    },

    // Update a course by course_id
    updateCourse: async (courseId, updatedData) => {
        return await Course.update(updatedData, { where: { course_id: courseId } });
    },

    // Delete a course by course_id
    deleteCourse: async (courseId) => {
        return await Course.destroy({ where: { course_id: courseId } });
    }
};

export default courseService;
