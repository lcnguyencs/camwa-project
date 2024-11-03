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
    allowNull: false,
  },
  class_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: { model: 'Class', key: 'class_id' },
  },
  intake_module_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: { model: 'IntakeModule', key: 'intake_module_id' },
  },
  lecturer_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Lecturer', key: 'staff_id' },
  },
  request_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
  indexes: [
    { unique: true, fields: ['class_id', 'intake_module_id', 'student_id'], name: 'unique_attendance_request_index' },
    { fields: ['student_id'] },  
    { fields: ['request_date'] },
  ]
});

export default AttendanceRequest;
