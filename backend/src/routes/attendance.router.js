import express from 'express';
import attendanceController from '../controllers/attendanceManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const attendanceRouter = express.Router();

// Create and manage attendance records (for Admin or Faculty Assistant)
attendanceRouter.post('/create', verifyTokenAndRole(['admin', 'faculty_assistant']), attendanceController.createAttendance);
attendanceRouter.get('/view', verifyTokenAndRole(['admin', 'faculty_assistant', 'LECTURER', 'student']), attendanceController.viewAttendance);
attendanceRouter.put('/:attendanceId', verifyTokenAndRole(['admin', 'faculty_assistant']), attendanceController.updateAttendance);
attendanceRouter.delete('/:attendanceId', verifyTokenAndRole(['admin', 'faculty_assistant']), attendanceController.deleteAttendance);

// Calculate and view eligibility for exams
attendanceRouter.get('/eligibility/calculate', verifyTokenAndRole(['admin', 'faculty_assistant']), attendanceController.calculateEligibility);
attendanceRouter.get('/eligibility/status', verifyTokenAndRole(['student', 'lecturer', 'admin']), attendanceController.viewExamEligibilityStatus);

// Attendance correction requests
attendanceRouter.post('/student/correction', verifyTokenAndRole(['admin', 'student']), attendanceController.requestAttendanceCorrection);
attendanceRouter.put('/correction/:requestId', verifyTokenAndRole(['admin', 'faculty_assistant']), attendanceController.handleCorrectionRequest);

export default attendanceRouter;
