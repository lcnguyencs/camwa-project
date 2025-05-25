import express from 'express';
import notificationController from '../controllers/notificationManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const notificationRouter = express.Router();

// Create and manage notifications
notificationRouter.post('/create', verifyTokenAndRole(['ADMIN', 'FACULTY']), notificationController.createNotification);

// Retrieve notifications by user role
notificationRouter.get('/student/:userId', verifyTokenAndRole(['STUDENT', 'ADMIN', 'FACULTY']), notificationController.viewNotifications);
notificationRouter.get('/lecturer/:userId', verifyTokenAndRole(['LECTURER', 'ADMIN', 'FACULTY']), notificationController.viewNotifications);

// Update notification status
notificationRouter.put('/:notificationId', verifyTokenAndRole(['STUDENT', 'LECTURER', 'ADMIN', 'FACULTY']), notificationController.updateNotification);

// Mark a notification as read
notificationRouter.put('/:userRole/:notificationId/read', verifyTokenAndRole(['ADMIN', 'FACULTY', 'STUDENT', 'LECTURER']), notificationController.markAsRead);

// Delete a notification (Admin and Faculty Assistant)
notificationRouter.delete('/:userRole/:notificationId', verifyTokenAndRole(['ADMIN', 'FACULTY']), notificationController.deleteNotification); 

export default notificationRouter;
