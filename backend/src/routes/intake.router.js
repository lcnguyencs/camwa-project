import express from 'express';
import intakeController from '../controllers/intake.controller.js';

const intakeRouter = express.Router();

// Get all intakes
intakeRouter.get('/', intakeController.getAllIntakes);

export default intakeRouter; 