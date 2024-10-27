import express from 'express';
import classController from '../controllers/classManagement.controller.js';

const classRouter = express.Router();

// Create and update classes (for Faculty Assistant or Admin)
classRouter.post('/create', classController.createClass);
classRouter.put('/:classId', classController.updateClass);
classRouter.delete('/:classId', classController.deleteClass);

// View classes by role and module
classRouter.get('/lecturer/:lecturerId', classController.viewClassesByLecturer);
classRouter.get('/student/:studentId', classController.viewClassesByStudent);
classRouter.get('/intake-module/:moduleId', classController.viewClassesByIntakeModule);

// Attendance views and rates
classRouter.get('/attendance/:classId', classController.viewStudentAttendance);
classRouter.get('/attendance-rate/:moduleId', classController.viewStudentAttendanceRate);

export default classRouter;
