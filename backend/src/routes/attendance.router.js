import express from 'express';
import attendanceController from '../controllers/attendanceManagement.controller.js';

const attendanceRouter = express.Router();

// Create and manage attendance records (for Admin or Faculty Assistant)
attendanceRouter.post('/create', attendanceController.createAttendance);
attendanceRouter.get('/view', attendanceController.viewAttendance);
attendanceRouter.put('/:attendanceId', attendanceController.updateAttendance);
attendanceRouter.delete('/:attendanceId', attendanceController.deleteAttendance);

// Calculate and view eligibility for exams
attendanceRouter.get('/eligibility/calculate', attendanceController.calculateEligibility);
attendanceRouter.get('/eligibility/status', attendanceController.viewExamEligibilityStatus);

// Attendance correction requests
attendanceRouter.post('/student/correction', attendanceController.requestAttendanceCorrection);
attendanceRouter.put('/correction/:requestId', attendanceController.handleCorrectionRequest);

export default attendanceRouter;
