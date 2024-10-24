import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const AttendanceRequest = sequelize.define('AttendanceRequest', {
  request_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Student', key: 'student_id' },
  },
  module_id: {
    type: DataTypes.STRING(36),
    references: { model: 'Module', key: 'module_id' },
  },
  lecturer_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Lecturer', key: 'staff_id' },
  },
  request_date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'pending',
  },
  reason: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'attendance_request',
  timestamps: false,
});

export default AttendanceRequest;
