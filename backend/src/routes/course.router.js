import express from 'express';
import courseController from '../controllers/courseManagement.controller.js';

const courseRouter = express.Router();

// Admin creates a course
courseRouter.post('/admin/create-courses', courseController.createCourse);

// Faculty Assistant assigns lecturer to an intake module
courseRouter.put('/faculty-assistant/:intakeModuleId/assign-lecturer', courseController.assignLecturerToIntakeModule);

// Faculty Assistant assigns students to an intake module
courseRouter.put('/faculty-assistant/:intakeModuleId/assign-students', courseController.assignStudentsToIntakeModule);

// Faculty Assistant creates classes for intake module
courseRouter.post('/faculty-assistant/:intakeModuleId/create-classes', courseController.createClassesForIntakeModule);

// Admin/Faculty Assistant updates a course
courseRouter.put('/admin/:courseId/courses-update', courseController.updateCourse);
courseRouter.put('/faculty-assistant/:courseId/courses-update', courseController.updateCourse);

// Admin deletes a course
courseRouter.delete('/admin/:courseId/courses-delete', courseController.deleteCourse);

export default courseRouter;
