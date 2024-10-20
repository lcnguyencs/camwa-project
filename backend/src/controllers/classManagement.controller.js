import classService from "../services/class.service.js";
import { responseError, responseSuccess } from '../common/helpers/response.helper.js';

const classManagement = {
    // Create Class
    createClass: async (req, res, next) => {
        try {
            const classData = req.body;
            const result = await classService.createClass(classData);
            const resData = responseSuccess(result, 'Class created successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to create class');
            res.status(resError.code).json(resError);
        }
    },

    // View Classes (List all classes for a course)
    viewClasses: async (req, res, next) => {
        try {
            const courseId = req.params.courseId;
            const result = await classService.viewClasses(courseId);
            const resData = responseSuccess(result, 'Classes retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve classes');
            res.status(resError.code).json(resError);
        }
    },

    // Update Class
    updateClass: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            const updatedData = req.body;
            const result = await classService.updateClass(classId, updatedData);
            const resData = responseSuccess(result, 'Class updated successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to update class');
            res.status(resError.code).json(resError);
        }
    },

    // Delete Class
    deleteClass: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            await classService.deleteClass(classId);
            const resData = responseSuccess(result, 'Class deleted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to delete class');
            res.status(resError.code).json(resError);
        }
    },
};

export default classManagement;
