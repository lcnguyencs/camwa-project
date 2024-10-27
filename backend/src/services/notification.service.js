import Notification from '../models/Notification.model.js';

const notificationService = {
    // Create a new notification
    createNotification: async (notificationData) => {
        // Automatically add additional metadata if needed (e.g., timestamps, status)
        notificationData.status = 'unread'; // default status
        notificationData.not_date = new Date(); // set creation timestamp
        return await Notification.create(notificationData);
    },


    // View notifications by receiver (user) with ordering and status distinction
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

    // Mark a notification as read and store the read timestamp
    markAsRead: async (notificationId) => {
        return await Notification.update(
            { 
                status: 'read', 
                read_timestamp: new Date() // store when the notification was read
            }, 
            { 
                where: { notification_id: notificationId } 
            }
        );
    },

    // Update notification content (allowed only by authorized users like Faculty Assistant or Admin)
    updateNotification: async (notificationId, updatedData) => {
        return await Notification.update(updatedData, { where: { notification_id: notificationId } });
    },

    // Delete a notification by notification_id (allowed only by authorized users)
    deleteNotification: async (notificationId) => {
        return await Notification.destroy({ where: { notification_id: notificationId } });
    },

    // Send notification email to user based on notification data (assuming a mail service exists)
    sendNotificationEmail: async (receiverEmail, notificationContent) => {
        // Assume there's a separate email service that handles sending emails
        await emailService.sendEmail({
            to: receiverEmail,
            subject: 'New Notification',
            text: notificationContent
        });
    }
};

export default notificationService;
