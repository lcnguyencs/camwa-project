import courseService from "../services/course.service.js";
import { responseError, responseSuccess } from "../common/helpers/response.helper.js";

const courseManagement = {
    // Create Course (Admin only)
    createCourse: async (req, res, next) => {
        try {
            const courseData = req.body;
            const result = await courseService.createCourse(courseData);
            const resData = responseSuccess(result, 'Course created successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to create course:", error);
            const resError = responseError(error, 'Failed to create course');
            res.status(resError.code).json(resError);
        }
    },

    // View Courses (List all courses, for Admin/Faculty Assistant)
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

    // Assign Lecturer to Intake Module (Faculty Assistant only)
    assignLecturerToIntakeModule: async (req, res, next) => {
        try {
            const intakeModuleId = req.params.intakeModuleId;
            const lecturerId = req.body.lecturerId;
            const result = await courseService.assignLecturerToIntakeModule(intakeModuleId, lecturerId);
            const resData = responseSuccess(result, 'Lecturer assigned to intake module successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to assign lecturer to intake module:", error);
            const resError = responseError(error, 'Failed to assign lecturer to intake module');
            res.status(resError.code).json(resError);
        }
    },

    // Assign Students to Intake Module (Faculty Assistant only)
    assignStudentsToIntakeModule: async (req, res, next) => {
        try {
            const intakeModuleId = req.params.intakeModuleId;
            const studentIds = req.body.studentIds;
            const result = await courseService.assignStudentsToIntakeModule(intakeModuleId, studentIds);
            const resData = responseSuccess(result, 'Students assigned to intake module successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to assign students to intake module:", error);
            const resError = responseError(error, 'Failed to assign students to intake module');
            res.status(resError.code).json(resError);
        }
    },

    // Create Classes for Intake Module (Faculty Assistant)
    createClassesForIntakeModule: async (req, res, next) => {
        try {
            const intakeModuleId = req.params.intakeModuleId;
            const result = await courseService.createClassesForIntakeModule(intakeModuleId);
            const resData = responseSuccess(result, 'Classes created for intake module successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to create classes for intake module:", error);
            const resError = responseError(error, 'Failed to create classes for intake module');
            res.status(resError.code).json(resError);
        }
    },

    // Update Course (Admin/Faculty Assistant)
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

    // Delete Course (Admin only)
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
