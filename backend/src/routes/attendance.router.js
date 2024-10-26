import express from 'express';
import attendanceController from '../controllers/attendanceManagement.controller.js';

const attendanceRouter = express.Router();

// Admin or Faculty Assistant creates an attendance record (automated or manual)
attendanceRouter.post('/admin-faculty/create-attendance', attendanceController.createAttendance);

// View attendance records by class or student (Admin/Faculty Assistant)
attendanceRouter.get('/admin-faculty/attendance-view', attendanceController.viewAttendance);

// Faculty Assistant or Lecturer updates an attendance record for corrections
attendanceRouter.put('/faculty-assistant/:attendanceId/update-attendance', attendanceController.updateAttendance);
attendanceRouter.put('/lecturer/:attendanceId/update-attendance', attendanceController.updateAttendance);

// Faculty Assistant deletes an attendance record by ID
attendanceRouter.delete('/faculty-assistant/:attendanceId/delete-attendance', attendanceController.deleteAttendance);

// Calculate a student's eligibility for exams based on attendance (Admin/Faculty Assistant)
attendanceRouter.get('/admin-faculty/calculate-eligibility', attendanceController.calculateEligibility);

// View a student's exam eligibility status for a specific module (Admin/Faculty Assistant)
attendanceRouter.get('/admin-faculty/eligibility-status', attendanceController.viewExamEligibilityStatus);

// Students submit a request for attendance correction
attendanceRouter.post('/student/request-correction', attendanceController.requestAttendanceCorrection);

// Faculty Assistant approves or denies an attendance correction request
attendanceRouter.put('/faculty-assistant/correction/:requestId/approve-deny', attendanceController.handleCorrectionRequest);

export default attendanceRouter;
