import notificationService from "../services/notification.service.js";
import { responseError, responseSuccess } from "../common/helpers/response.helper.js";

const notificationManagement = {
    // Create Notification (Automatic or Manual)
    createNotification: async (req, res, next) => {
        try {
            const notificationData = req.body;
            const result = await notificationService.createNotification(notificationData);
            const resData = responseSuccess(result, 'Notification created successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to create notification');
            res.status(resError.code).json(resError);
        }
    },

    // View Notifications
    viewNotifications: async (req, res, next) => {
        try {
            const userId = req.params.userId;  // User-specific notifications
            const result = await notificationService.viewNotifications(userId);
            const resData = responseSuccess(result, 'Notifications retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve notifications');
            res.status(resError.code).json(resError);
        }
    },

    // Update Notification (Mark as read, update content, etc.)
    updateNotification: async (req, res, next) => {
        try {
            const notificationId = req.params.notificationId;
            const updatedData = req.body;
            const result = await notificationService.updateNotification(notificationId, updatedData);
            const resData = responseSuccess(result, 'Notification updated successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to update notification');
            res.status(resError.code).json(resError);
        }
    },

    // Delete Notification
    deleteNotification: async (req, res, next) => {
        try {
            const notificationId = req.params.notificationId;
            await notificationService.deleteNotification(notificationId);
            const resData = responseSuccess(result, 'Notification deleted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to delete notification');
            res.status(resError.code).json(resError);
        }
    },
};

export default notificationManagement;
