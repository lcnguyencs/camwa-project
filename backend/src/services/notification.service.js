import Notification from '../models/Notification.model.js';

const notificationService = {
    // Create a new notification
    createNotification: async (notificationData) => {
        return await Notification.create(notificationData);
    },

    // View notifications by receiver (user)
    viewNotificationsByReceiver: async (receiverId) => {
        return await Notification.findAll({
            where: { receiver_id: receiverId },
            order: [['not_date', 'DESC']]
        });
    },

    // View notifications by sender (user)
    viewNotificationsBySender: async (senderId) => {
        return await Notification.findAll({
            where: { sender_id: senderId },
            order: [['not_date', 'DESC']]
        });
    },

    // View notifications by module
    viewNotificationsByModule: async (moduleId) => {
        return await Notification.findAll({
            where: { module_id: moduleId },
            order: [['not_date', 'DESC']]
        });
    },

    // View notifications by status (unread/read)
    viewNotificationsByStatus: async (status) => {
        return await Notification.findAll({
            where: { status },
            order: [['not_date', 'DESC']]
        });
    },

    // Update a notification by notification_id
    updateNotification: async (notificationId, updatedData) => {
        return await Notification.update(updatedData, { where: { notification_id: notificationId } });
    },

    // Delete a notification by notification_id
    deleteNotification: async (notificationId) => {
        return await Notification.destroy({ where: { notification_id: notificationId } });
    },

    // Mark a notification as read
    markAsRead: async (notificationId) => {
        return await Notification.update({ status: 'read' }, { where: { notification_id: notificationId } });
    }
};

export default notificationService;
