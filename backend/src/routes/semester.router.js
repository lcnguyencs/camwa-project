import express from 'express';
import semesterController from '../controllers/semesterManagement.controller.js';

const semesterRouter = express.Router();

semesterRouter.get('/', semesterController.getAllSemesters);
semesterRouter.get('/:sem_id', semesterController.findSemesterById);

export default semesterRouter; 