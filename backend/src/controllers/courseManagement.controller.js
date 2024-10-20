import courseService from "../services/course.service.js";
import { responseError, responseSuccess } from "../common/helpers/response.helper.js";

const courseManagement = {
    // Create Course
    createCourse: async (req, res, next) => {
        try {
            const courseData = req.body;
            const result = await courseService.createCourse(courseData);
            const resData = responseSuccess(result, 'Course created successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to create course');
            res.status(resError.code).json(resError);
        }
    },

    // View Courses (List all courses)
    viewCourses: async (req, res, next) => {
        try {
            const result = await courseService.viewCourses();
            const resData = responseSuccess(result, 'Courses retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve courses');
            res.status(resError.code).json(resError);
        }
    },

    // Update Course
    updateCourse: async (req, res, next) => {
        try {
            const courseId = req.params.courseId;
            const updatedData = req.body;
            const result = await courseService.updateCourse(courseId, updatedData);
            const resData = responseSuccess(result, 'Course updated successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to update course');
            res.status(resError.code).json(resError);
        }
    },

    // Delete Course
    deleteCourse: async (req, res, next) => {
        try {
            const courseId = req.params.courseId;
            await courseService.deleteCourse(courseId);
            const resData = responseSuccess(result, 'Course deleted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to delete course');
            res.status(resError.code).json(resError);
        }
    },
};

export default courseManagement;
