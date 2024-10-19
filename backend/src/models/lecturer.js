const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Lecturer = sequelize.define('Lecturer', {
  staff_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  program_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'lecturer'
});

module.exports = Lecturer;
