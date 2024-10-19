const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Program = sequelize.define('Program', {
  program_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  duration: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'program',
  timestamps: false,
});

module.exports = Program;
