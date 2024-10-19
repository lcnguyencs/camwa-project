const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Semester = sequelize.define('Semester', {
  sem_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
  },
  sem_type: {
    type: DataTypes.STRING(20),
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'semester',
  timestamps: false,
});

module.exports = Semester;
