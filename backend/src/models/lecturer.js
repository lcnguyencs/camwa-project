const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lecturer = sequelize.define('Lecturer', {
  staff_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = Lecturer;
