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

    // View Courses by Lecturer (Lecturer-specific view)
    viewCoursesByLecturer: async (req, res, next) => {
        try {
            const lecturerId = req.params.lecturerId;
            const result = await courseService.viewCoursesByLecturer(lecturerId);
            const resData = responseSuccess(result, 'Courses retrieved successfully for the lecturer');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve courses for the lecturer');
            res.status(resError.code).json(resError);
        }
    },

    // View Courses by Student (Student-specific view)
    viewCoursesByStudent: async (req, res, next) => {
        try {
            const studentId = req.params.studentId;
            const result = await courseService.viewCoursesForStudent(studentId);
            const resData = responseSuccess(result, 'Courses retrieved successfully for the student');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve courses for the student');
            res.status(resError.code).json(resError);
        }
    },

    // Assign Lecturer to Course (Faculty Assistant only)
    assignLecturerToCourse: async (req, res, next) => {
        try {
            const courseId = req.params.courseId;
            const lecturerId = req.body.lecturerId;
            const result = await courseService.assignLecturerToCourse(courseId, lecturerId);
            const resData = responseSuccess(result, 'Lecturer assigned to course successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to assign lecturer to course');
            res.status(resError.code).json(resError);
        }
    },

    // Assign Students to Course (Faculty Assistant only)
    assignStudentsToCourse: async (req, res, next) => {
        try {
            const courseId = req.params.courseId;
            const studentIds = req.body.studentIds; // Array of student IDs
            const result = await courseService.assignStudentsToCourse(courseId, studentIds);
            const resData = responseSuccess(result, 'Students assigned to course successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to assign students to course');
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
