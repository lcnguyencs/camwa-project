import express from 'express';
import notificationController from '../controllers/notificationManagement.controller.js';

const notificationRouter = express.Router();

// Create notification (for Admin or Faculty Assistant)
notificationRouter.post('/create', notificationController.createNotification);

// Retrieve notifications by user role
notificationRouter.get('/student/:userId', notificationController.viewNotifications);
notificationRouter.get('/lecturer/:userId', notificationController.viewNotifications);

// Mark a notification as read
notificationRouter.put('/:userRole/:notificationId/read', notificationController.markAsRead);

// Update a notification (Admin and Faculty Assistant)
notificationRouter.put('/:userRole/:notificationId', notificationController.updateNotification);

// Delete a notification (Admin and Faculty Assistant)
notificationRouter.delete('/:userRole/:notificationId', notificationController.deleteNotification);

export default notificationRouter;
