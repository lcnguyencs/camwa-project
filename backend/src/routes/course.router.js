import express from 'express';
import courseController from '../controllers/courseManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const courseRouter = express.Router();

// Create a course (Admin only)
courseRouter.post('/create', verifyTokenAndRole(['admin']), courseController.createCourse); 

// Update and delete courses (Admin/Faculty Assistant)
courseRouter.put('/:courseId', verifyTokenAndRole(['admin', 'faculty_assistant']),  courseController.updateCourse); 
courseRouter.delete('/:courseId', verifyTokenAndRole(['admin']),  courseController.deleteCourse); 

// Assign lecturers and students to intake modules (Faculty Assistant only)
courseRouter.put('/:intakeModuleId/assign-lecturer', verifyTokenAndRole(['admin', 'faculty_assistant']), courseController.assignLecturerToIntakeModule); 
courseRouter.put('/:intakeModuleId/assign-students', verifyTokenAndRole(['admin', 'faculty_assistant']), courseController.assignStudentsToIntakeModule); 

// Create classes for intake modules (Faculty Assistant only)
courseRouter.post('/:intakeModuleId/classes', verifyTokenAndRole(['admin', 'faculty_assistant']), courseController.createClassesForIntakeModule); 

// Export Intake Module Report (Faculty Assistant only)
courseRouter.get('/:intakeModuleId/export-report', verifyTokenAndRole(['admin', 'faculty_assistant']), courseController.exportIntakeModuleReport);

export default courseRouter;
