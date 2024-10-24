import express from 'express';
import classController from '../controllers/classManagement.controller.js';

const classRouter = express.Router();

// Faculty Assistant creates a class
classRouter.post('/faculty-assistant/create-classes', classController.createClass);

// View all classes (for Admin/Faculty Assistant)
classRouter.get('/admin/classes-view', classController.viewClasses);
classRouter.get('/faculty-assistant/classes-view', classController.viewClasses);

// Lecturer views assigned classes
classRouter.get('/lecturer/:lecturerId/classes-view', classController.viewClassesByLecturer);

// Student views enrolled classes
classRouter.get('/student/:studentId/classes-view', classController.viewClassesByStudent);

// Faculty Assistant views classes by module
classRouter.get('/faculty-assistant/modules/:moduleId/classes-view', classController.viewClassesByModule);

// Faculty Assistant or Lecturer views classes by lecturer
classRouter.get('/faculty-assistant/lecturers/:lecturerId/classes-view', classController.viewClassesByLecturer);
classRouter.get('/lecturer/:lecturerId/classes-view', classController.viewClassesByLecturer);

// Lecturer views student attendance for a class
classRouter.get('/lecturer/:classId/attendance-view', classController.viewStudentAttendance);

// Lecturer views student's attendance rate for the module
classRouter.get('/lecturer/:moduleId/attendance-rate', classController.viewStudentAttendanceRate);

// Admin/Faculty Assistant updates a class
classRouter.put('/admin/:classId/classes-update', classController.updateClass);
classRouter.put('/faculty-assistant/:classId/classes-update', classController.updateClass);

// Admin deletes a class
classRouter.delete('/admin/classes/:classId/delete', classController.deleteClass);

// Faculty Assistant deletes a class
classRouter.delete('/faculty-assistant/classes/:classId/delete', classController.deleteClass);

export default classRouter;
