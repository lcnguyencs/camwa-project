const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attendance = sequelize.define('Attendance', {
  attendance_id: {
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
  class_date: {
    type: DataTypes.DATE,
  },
  attendance_status: {
    type: DataTypes.STRING(10),
  },
}, {
  tableName: 'attendance',
  timestamps: false,
});

module.exports = Attendance;
