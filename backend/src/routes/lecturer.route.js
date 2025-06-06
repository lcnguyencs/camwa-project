import express from 'express';
import lecturerController from '../controllers/lecturerManagement.controller.js';

const lecturerRouter = express.Router();

lecturerRouter.post('/', lecturerController.createLecturer);
lecturerRouter.get('/', lecturerController.getAllLecturers);
lecturerRouter.get('/:lecturer_id', lecturerController.findLecturerById);
lecturerRouter.delete('/:lecturer_id', lecturerController.deleteLecturer);
lecturerRouter.put('/:lecturer_id', lecturerController.updateLecturer);

export default lecturerRouter;
