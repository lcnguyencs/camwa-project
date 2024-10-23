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
courseRouter.get('/admin/courses', courseController.viewCourses);
courseRouter.get('/faculty-assistant/courses', courseController.viewCourses);

// Lecturer views assigned courses
courseRouter.get('/lecturer/:lecturerId', courseController.viewCoursesByLecturer);

// Student views enrolled courses
courseRouter.get('/student/:studentId', courseController.viewCoursesByStudent);

// Admin/Faculty Assistant updates a course
courseRouter.put('/admin/courses/:courseId', courseController.updateCourse);
courseRouter.put('/faculty-assistant/courses/:courseId', courseController.updateCourse);

// Admin deletes a course
courseRouter.delete('/admin/courses/:courseId', courseController.deleteCourse);

export default courseRouter;
