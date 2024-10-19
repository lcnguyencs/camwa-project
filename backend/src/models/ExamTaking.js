const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ExamTaking = sequelize.define('ExamTaking', {
  student_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Student', key: 'student_id' },
    primaryKey: true,
  },
  module_id: {
    type: DataTypes.STRING(36),
    references: { model: 'Module', key: 'module_id' },
    primaryKey: true,
  },
  exam_date: {
    type: DataTypes.DATE,
    primaryKey: true,
  },
  is_eligible: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'exam_taking',
  timestamps: false,
});

module.exports = ExamTaking;
