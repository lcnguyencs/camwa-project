const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  student_id: DataTypes.STRING,
  module_id: DataTypes.STRING,
  attendance_date: DataTypes.DATE,
  status: DataTypes.BOOLEAN,
});

module.exports = Attendance;
