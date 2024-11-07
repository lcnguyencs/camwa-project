import Notification from '../models/Notification.model.js';

const notificationService = {
    // Create a new notification
    createNotification: async (req, res, next) => {
        try {
            const notificationData = req.body;
            
            // Check if it’s an auto or manual notification
            if (notificationData.auto) {
                // Set specific fields for auto-generated notifications if required
                notificationData.notification_type = notificationData.notification_type || 'system';
                notificationData.content = `System notification: ${notificationData.content}`;
            }
    
            const result = await notificationService.createNotification(notificationData);
    
            // Only send email if this is a manual notification or has a specified email
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
    


    // View notifications by receiver (user) with ordering and status distinction
    viewNotificationsByReceiver: async (receiverId) => {
        return await Notification.findAll({
            where: { receiver_id: receiverId },
            order: [['priority', 'DESC'], ['not_date', 'DESC']]
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

    checkDependencies: async (notificationId) => {
        const notification = await Notification.findByPk(notificationId);
        // Example dependency check: non-deletable if `is_critical` flag is true
        return notification && notification.is_critical;
    },
    
    // Delete a notification by notification_id (allowed only by authorized users)
    deleteNotification: async (notificationId) => {
        const hasDependencies = await notificationService.checkDependencies(notificationId);
        if (hasDependencies) {
            throw new Error('Cannot delete notification with critical dependencies');
        }
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
