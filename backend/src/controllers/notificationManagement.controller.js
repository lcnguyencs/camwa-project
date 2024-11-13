import notificationService from "../services/notification.service.js";
import { responseError, responseSuccess } from "../common/helpers/response.helper.js";

const notificationManagement = {
    // Create Notification (Automatic or Manual)
    createNotification: async (req, res, next) => {
        try {
            const notificationData = req.body;
            const result = await notificationService.createNotification(notificationData);

            // Send email notification if an email address is provided
            if (notificationData.receiver_email) {
                await notificationService.sendNotificationEmail(
                    notificationData.receiver_email,
                    notificationData.content
                );
            }

            const resData = responseSuccess(result, 'Notification created successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to create notification');
            res.status(resError.code).json(resError);
        }
    },

    // View Notifications by User
    viewNotifications: async (req, res, next) => {
        try {
            const userId = req.params.userId; // User-specific notifications
            const status = req.query.status; // Option to filter by status (e.g., unread/read)
            let result;

            if (status) {
                // Retrieve notifications by status
                result = await notificationService.viewNotificationsByStatus(status);
            } else {
                // Retrieve all notifications for the user
                result = await notificationService.viewNotificationsByReceiver(userId);
            }

            const resData = responseSuccess(result, 'Notifications retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to retrieve notifications');
            res.status(resError.code).json(resError);
        }
    },

    // Mark Notification as Read and Update Timestamp
    markAsRead: async (req, res, next) => {
        try {
            const notificationId = req.params.notificationId;
            const result = await notificationService.markAsRead(notificationId);
            const resData = responseSuccess(result, 'Notification marked as read successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to mark notification as read');
            res.status(resError.code).json(resError);
        }
    },

    // Update Notification Content (Only allowed for authorized users)
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

    // Delete Notification (Only allowed for authorized users)
    deleteNotification: async (req, res, next) => {
        try {
            const notificationId = req.params.notificationId;
            await notificationService.deleteNotification(notificationId);
            const resData = responseSuccess({}, 'Notification deleted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error, 'Failed to delete notification');
            res.status(resError.code).json(resError);
        }
    }
};

export default notificationManagement;
