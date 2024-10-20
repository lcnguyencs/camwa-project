import express from 'express';
import classController from '../controllers/classManagement.controller.js';

const classRouter = express.Router();

classRouter.post('/create', classController.createClass);
classRouter.get('/:courseId', classController.viewClasses);
classRouter.put('/:classId', classController.updateClass);
classRouter.delete('/:classId', classController.deleteClass);

export default classRouter;
