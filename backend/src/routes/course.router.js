import express from 'express';
import courseController from '../controllers/courseManagement.controller.js';

const courseRouter = express.Router();

courseRouter.post('/create', courseController.createCourse);
courseRouter.get('/', courseController.viewCourses);
courseRouter.put('/:courseId', courseController.updateCourse);
courseRouter.delete('/:courseId', courseController.deleteCourse);

export default courseRouter;
