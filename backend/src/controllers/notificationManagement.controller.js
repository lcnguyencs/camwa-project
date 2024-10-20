import notificationService from "../services/notification.service.js";

const notificationManagement = {
    // Create Notification (Automatic or Manual)
    createNotification: async (req, res, next) => {
        try {
            const notificationData = req.body;
            const result = await notificationService.createNotification(notificationData);
            res.status(201).json({ message: 'Notification created successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // View Notifications
    viewNotifications: async (req, res, next) => {
        try {
            const userId = req.params.userId;  // User-specific notifications
            const result = await notificationService.viewNotifications(userId);
            res.status(200).json({ message: 'Notifications retrieved successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // Update Notification (Mark as read, update content, etc.)
    updateNotification: async (req, res, next) => {
        try {
            const notificationId = req.params.notificationId;
            const updatedData = req.body;
            const result = await notificationService.updateNotification(notificationId, updatedData);
            res.status(200).json({ message: 'Notification updated successfully', data: result });
        } catch (error) {
            next(error);
        }
    },

    // Delete Notification
    deleteNotification: async (req, res, next) => {
        try {
            const notificationId = req.params.notificationId;
            await notificationService.deleteNotification(notificationId);
            res.status(200).json({ message: 'Notification deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
};

export default notificationManagement;
