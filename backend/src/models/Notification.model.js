import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const Notification = sequelize.define('Notification', {
  notification_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Iam', key: 'acc_id' },
  },
  receiver_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Student', key: 'student_id' },
  },
  notification_type: {
    type: DataTypes.STRING(50),
  },
  notification_text: {
    type: DataTypes.TEXT,
  },
  notification_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'unread',
    validate: {
      isIn: [['unread', 'read']], 
    },
  },
  module_id: {
    type: DataTypes.STRING(36),
    references: { model: 'Module', key: 'module_id' },
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Set priority levels, e.g., 1 for high, 0 for normal, -1 for low
  },
  is_critical: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  read_by_receiver: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'notification',
  timestamps: false,
  indexes: [
    { fields: ['receiver_id'] },
    { fields: ['status'] },
    { fields: ['priority'] },
    { fields: ['is_critical'] },
  ],

});

export default Notification;
