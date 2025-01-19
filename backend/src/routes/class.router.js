import express from 'express';
import classController from '../controllers/classManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const classRouter = express.Router();

// Create and update classes (Faculty Assistant or Admin)
classRouter.post('/create', verifyTokenAndRole(['faculty_assistant', 'admin']), classController.createClass); 
classRouter.put('/:classId', verifyTokenAndRole(['faculty_assistant', 'admin']), classController.updateClass); 
classRouter.delete('/:classId', verifyTokenAndRole(['faculty_assistant']), classController.deleteClass); 

// View classes by role and module
classRouter.get('/lecturer/:lecturerId', verifyTokenAndRole(['lecturer', 'faculty_assistant', 'admin']), classController.viewClassesByLecturer); 
classRouter.get('/student/:studentId', verifyTokenAndRole(['student', 'faculty_assistant', 'admin']), classController.viewClassesByStudent); 
classRouter.get('/intake-module/:intakeModuleId', verifyTokenAndRole(['faculty_assistant', 'admin']), classController.viewClassesByIntakeModule); 

// Attendance views and rates
classRouter.get('/attendance/:classId', verifyTokenAndRole(['lecturer', 'faculty_assistant', 'admin']), classController.viewStudentAttendance); 
classRouter.get('/attendance-rate/:moduleId', verifyTokenAndRole(['lecturer', 'faculty_assistant', 'admin']), classController.viewStudentAttendanceRate); 

export default classRouter;
