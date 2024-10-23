import express from 'express';
import courseController from '../controllers/courseManagement.controller.js';

const courseRouter = express.Router();

// Admin creates a course
courseRouter.post('/admin/create-courses', courseController.createCourse);

// Faculty Assistant assigns lecturer to a course
courseRouter.put('/faculty-assistant/:courseId/assign-lecturer', courseController.assignLecturerToCourse);

// Faculty Assistant assigns students to a course
courseRouter.put('/faculty-assistant/:courseId/assign-students', courseController.assignStudentsToCourse);

// General route to view all courses (for Admin/Faculty Assistant)
courseRouter.get('/admin/courses-view', courseController.viewCourses);
courseRouter.get('/faculty-assistant/courses-view', courseController.viewCourses);

// Lecturer views assigned courses
courseRouter.get('/lecturer/:lecturerId/courses-view', courseController.viewCoursesByLecturer);

// Student views enrolled courses
courseRouter.get('/student/:studentId/courses-view', courseController.viewCoursesByStudent);

// Admin/Faculty Assistant updates a course
courseRouter.put('/admin/:courseId/courses-update', courseController.updateCourse);
courseRouter.put('/faculty-assistant/:courseId/courses-update', courseController.updateCourse);

// Admin deletes a course
courseRouter.delete('/admin/:courseId/courses-delete', courseController.deleteCourse);

export default courseRouter;
