import express from 'express';
import intakeModuleController from '../controllers/intakeModuleManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const intakeModuleRouter = express.Router();

intakeModuleRouter.get('/next-id', intakeModuleController.getNextModuleId);
intakeModuleRouter.get('/search', intakeModuleController.searchModules);
intakeModuleRouter.get('/student/:studentId', verifyTokenAndRole(['STUDENT', 'ADMIN', 'FACULTY']), intakeModuleController.getStudentModules);
intakeModuleRouter.get('/', intakeModuleController.getAllIntakeModules);
intakeModuleRouter.get('/:moduleId', intakeModuleController.getModuleDetails);
intakeModuleRouter.post('/', intakeModuleController.createIntakeModule);
intakeModuleRouter.delete('/:moduleId', intakeModuleController.deleteIntakeModule);
intakeModuleRouter.put('/:moduleId', intakeModuleController.updateIntakeModule);
intakeModuleRouter.get('/:moduleId/students', intakeModuleController.getModuleStudents);

export default intakeModuleRouter;
