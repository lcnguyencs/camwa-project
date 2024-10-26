import attendanceService from "../services/attendance.service.js";
import { responseError, responseSuccess } from "../common/helpers/response.helper.js";

const attendanceManagement = {
    // Create Attendance (Automated or Manual)
    createAttendance: async (req, res, next) => {
        try {
            const attendanceData = req.body;
            const result = await attendanceService.createAttendance(attendanceData);
            const resData = responseSuccess(result, 'Attendance recorded successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // View Attendance Records by Class or Student
    viewAttendance: async (req, res, next) => {
        try {
            const { classId, studentId } = req.query;
            let result;
            if (classId) {
                result = await attendanceService.viewAttendanceByModule(classId);
            } else if (studentId) {
                result = await attendanceService.viewAttendanceByStudent(studentId);
            }
            const resData = responseSuccess(result, 'Attendance records retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // Update Attendance (for corrections)
    updateAttendance: async (req, res, next) => {
        try {
            const attendanceId = req.params.attendanceId;
            const updatedData = req.body;
            const result = await attendanceService.updateAttendance(attendanceId, updatedData);
            const resData = responseSuccess(result, 'Attendance updated successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // Delete Attendance Record
    deleteAttendance: async (req, res, next) => {
        try {
            const attendanceId = req.params.attendanceId;
            await attendanceService.deleteAttendance(attendanceId);
            const resData = responseSuccess(result, 'Attendance record deleted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // Calculate Exam Eligibility
    calculateEligibility: async (req, res, next) => {
        try {
            const { studentId, moduleId } = req.query;
            const result = await attendanceService.calculateEligibility(studentId, moduleId);
            const resData = responseSuccess(result, 'Eligibility calculated successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // View Exam Eligibility Status
    viewExamEligibilityStatus: async (req, res, next) => {
        try {
            const { studentId, moduleId } = req.query;
            const result = await attendanceService.viewExamEligibilityStatus(studentId, moduleId);
            const resData = responseSuccess(result, 'Exam eligibility status retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // Request Attendance Correction
    requestAttendanceCorrection: async (req, res, next) => {
        try {
            const { studentId, moduleId } = req.body;
            const requestDetails = req.body;
            const result = await attendanceService.requestAttendanceCorrection(studentId, moduleId, requestDetails);
            const resData = responseSuccess(result, 'Attendance correction request submitted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },

    // Approve/Deny Attendance Correction Request
    handleCorrectionRequest: async (req, res, next) => {
        try {
            const requestId = req.params.requestId;
            const { approvalStatus } = req.body; // true for approval, false for denial
            const result = await attendanceService.handleCorrectionRequest(requestId, approvalStatus);
            const resData = responseSuccess(result, `Correction request ${approvalStatus ? 'approved' : 'denied'} successfully`);
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },
};

export default attendanceManagement;

