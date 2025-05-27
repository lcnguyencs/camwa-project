import express from 'express';
import attendanceController from '../controllers/attendanceManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const attendanceRouter = express.Router();

// Create and manage attendance records (for Admin or Faculty Assistant)
attendanceRouter.post('/create', verifyTokenAndRole(['ADMIN', 'FACULTY']), attendanceController.createAttendance);
attendanceRouter.get('/view', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER', 'STUDENT']), attendanceController.viewAttendance);
attendanceRouter.get('/student/:studentId/module/:moduleId', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER', 'STUDENT']), attendanceController.getStudentModuleAttendance);
attendanceRouter.put('/update/:attendanceId', verifyTokenAndRole(['ADMIN', 'FACULTY']), attendanceController.updateAttendance);
attendanceRouter.delete('/delete/:attendanceId', verifyTokenAndRole(['ADMIN', 'FACULTY']), attendanceController.deleteAttendance);

// Calculate and view eligibility for exams
attendanceRouter.get('/eligibility/calculate', verifyTokenAndRole(['ADMIN', 'faculty_assistant']), attendanceController.calculateEligibility);
attendanceRouter.get('/eligibility/status', verifyTokenAndRole(['STUDENT', 'LECTURER', 'ADMIN']), attendanceController.viewExamEligibilityStatus);

// Attendance correction requests
attendanceRouter.post('/student/correction', verifyTokenAndRole(['ADMIN', 'student']), attendanceController.requestAttendanceCorrection);
attendanceRouter.put('/correction/:requestId', verifyTokenAndRole(['ADMIN', 'faculty_assistant']), attendanceController.handleCorrectionRequest);

export default attendanceRouter;
