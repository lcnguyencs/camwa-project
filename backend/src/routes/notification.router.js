import express from 'express';
import notificationController from '../controllers/notificationManagement.controller.js';

const notificationRouter = express.Router();

notificationRouter.post('/create', notificationController.createNotification);
notificationRouter.get('/:userId', notificationController.viewNotifications);
notificationRouter.put('/:notificationId', notificationController.updateNotification);
notificationRouter.delete('/:notificationId', notificationController.deleteNotification);

export default notificationRouter;
