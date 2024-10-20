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
  not_text: {
    type: DataTypes.TEXT,
  },
  not_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'unread',
  },
  module_id: {
    type: DataTypes.STRING(36),
    references: { model: 'Module', key: 'module_id' },
  },
}, {
  tableName: 'notification',
  timestamps: false,
});

export default Notification;
