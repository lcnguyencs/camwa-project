const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(40),
  },
  map_location: {
    type: DataTypes.STRING(20),
  },
  program_id: {
    type: DataTypes.STRING(20),
    references: { model: 'program', key: 'program_id' },
  },
  intake: {
    type: DataTypes.DATE,
    references: { model: 'intake', key: 'year' },
  },
}, {
  tableName: 'student',
  timestamps: false,
});

module.exports = Student;
