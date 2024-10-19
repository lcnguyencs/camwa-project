const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Exam = sequelize.define('Exam', {
  module_id: {
    type: DataTypes.STRING(36),
    references: { model: 'module', key: 'module_id' },
  },
  exam_date: {
    type: DataTypes.DATE,
    primaryKey: true,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  proctors: {
    type: DataTypes.STRING(45),
  },
}, {
  tableName: 'exam',
  timestamps: false,
});

module.exports = Exam;
