const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const facultyAssistant = sequelize.define('facultyAssistant', {
  facultyAssistant_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = facultyAssistant;
