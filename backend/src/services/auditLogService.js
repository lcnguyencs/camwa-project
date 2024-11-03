import AuditLog from '../models/AuditLog.model.js';

const auditLogService = {
    logAction: async (userId, action, details) => {
        try {
            await AuditLog.create({
                user_id: userId,
                action: action,
                details: JSON.stringify(details),
                timestamp: new Date(),
            });
        } catch (error) {
            console.error("Failed to log action:", error); // New: Log any logging errors
        }
    },
};

export default auditLogService;
