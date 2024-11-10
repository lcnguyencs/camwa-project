import Notification from '../models/Notification.model.js';
import { sendMail } from '../common/nodemailer/send-mail.nodemailer.js';

const notificationService = {
    // Create a new notification
    createNotification: async (req, res, next) => {
        try {
            const notificationData = req.body;
            
            // Check if it’s an auto or manual notification
            if (notificationData.auto) {
                notificationData.notification_type = notificationData.notification_type || 'system';
                notificationData.content = `System notification: ${notificationData.content}`;
            }
    
            // Directly create notification in the database
            const result = await Notification.create(notificationData);
    
            // Only send email if this is a manual notification or has a specified email
            if (notificationData.receiver_email) {
                await notificationService.sendNotificationEmail(
                    notificationData.receiver_email,
                    'New Notification Created',
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

    // Send notification email to user based on notification data
    sendNotificationEmail: async (receiverEmail, subject, content) => {
        await sendMail({
            to: receiverEmail,
            subject,
            text: content,
            html: `<b>${content}</b>`,
        });
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
        // Fetch notification to get receiverEmail
        const notification = await Notification.findByPk(notificationId);
        const result = await Notification.update(
            { 
                status: 'read', 
                read_timestamp: new Date()
            }, 
            { 
                where: { notification_id: notificationId } 
            }
        );

        if (notification && notification.receiver_email) {
            await notificationService.sendNotificationEmail(
                notification.receiver_email,
                'Notification Marked as Read',
                `The notification with ID ${notificationId} has been marked as read.`
            );
        }

        return result;
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
        const notification = await Notification.findByPk(notificationId);
        const hasDependencies = await notificationService.checkDependencies(notificationId);
        
        if (hasDependencies && notification && notification.receiver_email) {
            await notificationService.sendNotificationEmail(
                notification.receiver_email,
                'Critical Notification Deletion Attempt',
                `An attempt was made to delete a critical notification with ID ${notificationId}.`
            );
            throw new Error('Cannot delete notification with critical dependencies');
        }
        
        const result = await Notification.destroy({ where: { notification_id: notificationId } });
        
        if (notification && notification.receiver_email) {
            await notificationService.sendNotificationEmail(
                notification.receiver_email,
                'Notification Deleted',
                `The notification with ID ${notificationId} has been successfully deleted.`
            );
        }

        return result;
    },
};

export default notificationService;
