import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const dashboardRouter = express.Router();

// Only allow admin role to access dashboard stats
dashboardRouter.get('/stats', verifyTokenAndRole(['ADMIN']), getDashboardStats);

export default dashboardRouter;
