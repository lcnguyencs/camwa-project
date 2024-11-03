import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const AuditLog = sequelize.define('AuditLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'audit_log',
    timestamps: false,
});

export default AuditLog;
