import classService from "../services/class.service.js";
import { responseError, responseSuccess } from '../common/helpers/response.helper.js';

const classManagement = {
    // Create Class (Faculty Assistant)
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

    // View Classes by Module (for Admin/Faculty Assistant)
    viewClassesByIntakeModule: async (req, res, next) => {
        try {
            const intakeModuleId = req.params.intakeModuleId;
            const result = await classService.viewClassesByIntakeModule(intakeModuleId);
            const resData = responseSuccess(result, 'Classes retrieved successfully for the module');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve classes for the module');
            res.status(resError.code).json(resError);
        }
    },

    // View Classes by Lecturer (Faculty Assistant or Lecturer)
    viewClassesByLecturer: async (req, res, next) => {
        try {
            const lecturerId = req.params.lecturerId;
            const result = await classService.viewClassesByLecturer(lecturerId);
            const resData = responseSuccess(result, 'Classes retrieved successfully for the lecturer');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve classes for the lecturer');
            res.status(resError.code).json(resError);
        }
    },

    // View Classes by Student
    viewClassesByStudent: async (req, res, next) => {
        try {
            const studentId = req.params.studentId;
            const result = await classService.viewClassesForStudent(studentId);
            const resData = responseSuccess(result, 'Classes retrieved successfully for the student');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve classes for the student');
            res.status(resError.code).json(resError);
        }
    },

    // Assign Lecturer to Class
    assignLecturerToClass: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            const lecturerId = req.body.lecturerId;
            const result = await classService.assignLecturerToClass(classId, lecturerId);
            const resData = responseSuccess(result, 'Lecturer assigned to class successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to assign lecturer to class');
            res.status(resError.code).json(resError);
        }
    },

    // Assign Students to Class
    assignStudentsToClass: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            const studentIds = req.body.studentIds; // Array of student IDs
            const result = await classService.assignStudentsToClass(classId, studentIds);
            const resData = responseSuccess(result, 'Students assigned to class successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to assign students to class');
            res.status(resError.code).json(resError);
        }
    },

    // Update Class (Admin/Faculty Assistant)
    updateClass: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            const updatedData = req.body;
            console.log('Updating class with ID:', classId);
            console.log('Update data:', updatedData);
            
            const result = await classService.updateClass(classId, updatedData);
            console.log('Update result:', result);
            
            if (!result) {
                throw new Error('Failed to update class');
            }

            const resData = responseSuccess(result, 'Class updated successfully');
            res.status(200).json(resData);
        } catch (error) {
            console.error('Error in updateClass controller:', error);
            const resError = responseError(error, error.message || 'Failed to update class');
            res.status(resError.code).json(resError);
        }
    },

    // Delete Class (Faculty Assistant)
    deleteClass: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            await classService.deleteClass(classId);
            const resData = responseSuccess(null, 'Class deleted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to delete class');
            res.status(resError.code).json(resError);
        }
    },
    

    // Lecturer views student attendance for a class
    viewStudentAttendance: async (req, res, next) => {
        try {
            const classId = req.params.classId;
            const result = await classService.viewStudentAttendance(classId);
            const resData = responseSuccess(result, 'Student attendance retrieved successfully for the class');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve student attendance for the class');
            res.status(resError.code).json(resError);
        }
    },

    // Lecturer views student's attendance rate for the module
    viewStudentAttendanceRate: async (req, res, next) => {
        try {
            const moduleId = req.params.moduleId;
            const result = await classService.viewStudentAttendanceRate(moduleId);
            const resData = responseSuccess(result, 'Student attendance rate retrieved successfully for the module');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve student attendance rate for the module');
            res.status(resError.code).json(resError);
        }
    },

    // Get students enrolled in a module
    getStudentsByModule: async (req, res, next) => {
        try {
            const moduleId = req.params.moduleId;
            const result = await classService.getStudentsByModule(moduleId);
            const resData = responseSuccess(result, 'Students retrieved successfully for the module');
            res.status(200).json(resData);
        } catch (error) {
            console.error('Error in getStudentsByModule controller:', error);
            const resError = responseError(error, error.message || 'Failed to retrieve students for the module');
            res.status(resError.code).json(resError);
        }
    },

    // Invite student to module
    inviteStudentToModule: async (req, res, next) => {
        try {
            const { studentId } = req.body;
            const { moduleId } = req.params;

            if (!studentId) {
                const resError = responseError(new Error('Student ID is required'), 'Student ID is required');
                return res.status(resError.code).json(resError);
            }

            const result = await classService.inviteStudentToModule(studentId, moduleId);
            const resData = responseSuccess(result, 'Student invited successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, error.message || 'Failed to invite student');
            res.status(resError.code).json(resError);
        }
    },

    // Get student details by ID
    getStudentById: async (req, res, next) => {
        try {
            const { studentId } = req.params;
            const result = await classService.getStudentById(studentId);
            const resData = responseSuccess(result, 'Student details retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, error.message || 'Failed to retrieve student details');
            res.status(resError.code).json(resError);
        }
    },

    // Remove student from module
    removeStudentFromModule: async (req, res, next) => {
        try {
            const { studentId } = req.params;
            const { moduleId } = req.params;

            const result = await classService.removeStudentFromModule(studentId, moduleId);
            const resData = responseSuccess(result, 'Student removed successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, error.message || 'Failed to remove student');
            res.status(resError.code).json(resError);
        }
    },

};

export default classManagement;
