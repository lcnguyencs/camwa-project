import express from 'express';
import notificationController from '../controllers/notificationManagement.controller.js';

const notificationRouter = express.Router();

// Admin or Faculty Assistant creates a new notification (automatic or manual)
notificationRouter.post('/admin/create-notification', notificationController.createNotification);
notificationRouter.post('/faculty-assistant/create-notification', notificationController.createNotification);

// Retrieve notifications for a specific student or lecturer, optionally filtered by status
notificationRouter.get('/student/:userId/notifications', notificationController.viewNotifications);
notificationRouter.get('/lecturer/:userId/notifications', notificationController.viewNotifications);

// Mark a notification as read and store the read timestamp for students and lecturers
notificationRouter.put('/student/:notificationId/mark-as-read', notificationController.markAsRead);
notificationRouter.put('/lecturer/:notificationId/mark-as-read', notificationController.markAsRead);

// Update a notification content (restricted to Admin and Faculty Assistant roles)
notificationRouter.put('/admin/:notificationId/update-notification', notificationController.updateNotification);
notificationRouter.put('/faculty-assistant/:notificationId/update-notification', notificationController.updateNotification);

// Delete a notification (restricted to Admin and Faculty Assistant roles)
notificationRouter.delete('/admin/:notificationId/delete-notification', notificationController.deleteNotification);
notificationRouter.delete('/faculty-assistant/:notificationId/delete-notification', notificationController.deleteNotification);

export default notificationRouter;
