import express from 'express';
import intakeModuleController from '../controllers/intakeModuleManagement.controller.js';

const intakeModuleRouter = express.Router();

intakeModuleRouter.get('/', intakeModuleController.getAllIntakeModules);
intakeModuleRouter.get('/:moduleId', intakeModuleController.getModuleDetails);

export default intakeModuleRouter;
