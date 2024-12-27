import express from 'express';
import lecturerController from '../controllers/lecturer.controller.js';

const lecturerRouter = express.Router();

lecturerRouter.post('/', lecturerController.createLecturer);
lecturerRouter.get('/', lecturerController.getAllLecturers);
lecturerRouter.get('/:staff_id', lecturerController.findLecturerById);
lecturerRouter.delete('/:staff_id', lecturerController.deleteLecturer);
lecturerRouter.put('/:staff_id', lecturerController.updateLecturer);

export default lecturerRouter;
