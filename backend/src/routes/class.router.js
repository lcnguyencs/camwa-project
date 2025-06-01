import express from 'express';
import classManagement from '../controllers/classManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const classRouter = express.Router();

// Create and update classes (Faculty Assistant or Admin)
classRouter.post('/create', classManagement.createClass); 
classRouter.put('/:classId', classManagement.updateClass); 
classRouter.delete('/:classId', classManagement.deleteClass); 

// View classes by role and module
classRouter.get('/lecturer/:lecturerId', verifyTokenAndRole(['LECTURER', 'FACULTY', 'ADMIN']), classManagement.viewClassesByLecturer); 
// Temporarily removing role check for debugging
classRouter.get('/student/:studentId', classManagement.viewClassesByStudent); 
classRouter.get('/intake-module/:intakeModuleId', classManagement.viewClassesByIntakeModule); 
classRouter.get('/module/:moduleId/students', classManagement.getStudentsByModule);

// Student operations
classRouter.get('/student/:studentId/details', classManagement.getStudentById);
classRouter.post('/module/:moduleId/invite', classManagement.inviteStudentToModule);
classRouter.delete('/module/:moduleId/student/:studentId', classManagement.removeStudentFromModule);

// Attendance views and rates
classRouter.get('/attendance/:classId', verifyTokenAndRole(['LECTURER', 'FACULTY', 'ADMIN']), classManagement.viewStudentAttendance); 
classRouter.get('/attendance-rate/:moduleId', verifyTokenAndRole(['LECTURER', 'FACULTY', 'ADMIN']), classManagement.viewStudentAttendanceRate); 

export default classRouter;
