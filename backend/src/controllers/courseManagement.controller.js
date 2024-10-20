import courseService from "../services/course.service.js";

const courseManagement = {
    // Create Course
    createCourse: async (req, res, next) => {
        try {
            const courseData = req.body;
            const result = await courseService.createCourse(courseData);
            res.status(201).json({ message: 'Course created successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // View Courses (List all courses)
    viewCourses: async (req, res, next) => {
        try {
            const result = await courseService.viewCourses();
            res.status(200).json({ message: 'Courses retrieved successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // Update Course
    updateCourse: async (req, res, next) => {
        try {
            const courseId = req.params.courseId;
            const updatedData = req.body;
            const result = await courseService.updateCourse(courseId, updatedData);
            res.status(200).json({ message: 'Course updated successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // Delete Course
    deleteCourse: async (req, res, next) => {
        try {
            const courseId = req.params.courseId;
            await courseService.deleteCourse(courseId);
            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
};

export default courseManagement;
