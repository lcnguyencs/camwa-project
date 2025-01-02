import express from 'express';
import programController from '../controllers/programManagement.controller.js';

const programRouter = express.Router();

programRouter.post('/', programController.createProgram);
programRouter.get('/', programController.getAllPrograms);
programRouter.get('/:program_id', programController.findProgramById);
programRouter.delete('/:program_id', programController.deleteProgram);
programRouter.put('/:program_id', programController.updateProgram);

export default programRouter;
