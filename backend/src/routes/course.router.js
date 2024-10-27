import express from 'express';
import courseController from '../controllers/courseManagement.controller.js';

const courseRouter = express.Router();

// Create and manage courses
courseRouter.post('/create', courseController.createCourse);
courseRouter.put('/:courseId', courseController.updateCourse);
courseRouter.delete('/:courseId', courseController.deleteCourse);

// Assign lecturers and students to intake modules
courseRouter.put('/:intakeModuleId/assign-lecturer', courseController.assignLecturerToIntakeModule);
courseRouter.put('/:intakeModuleId/assign-students', courseController.assignStudentsToIntakeModule);

// Create classes for intake modules
courseRouter.post('/:intakeModuleId/classes', courseController.createClassesForIntakeModule);

export default courseRouter;
