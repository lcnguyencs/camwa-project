import AuditLog from '../models/AuditLog.model.js';

const auditLogService = {
    // Log an action performed by a user
    logAction: async (userId, action, details) => {
        // Validate inputs to ensure they are not null or undefined
        if (!userId || !action || typeof action !== 'string') {
            throw new Error('Invalid parameters: userId and action are required');
        }

        try {
            // Stringify details safely to avoid circular references or large data
            const detailsString = JSON.stringify(details, (key, value) => {
                // Optionally filter out sensitive or large properties here
                if (key === 'password') {
                    return undefined; // Remove sensitive fields
                }
                return value;
            });

            // Create the audit log entry
            await AuditLog.create({
                user_id: userId,            // userId (can be a STRING or UUID as per your model)
                action: action,             // Action performed
                details: detailsString,     // JSON stringified details of the action
                timestamp: new Date(),      // Timestamp when the action occurred (optional, as it's auto-handled by defaultValue: DataTypes.NOW)
            });
        } catch (error) {
            console.error("Failed to log action:", error);
            // Optionally log the error to a different service or a file for better visibility
        }
    },
};

export default auditLogService;
