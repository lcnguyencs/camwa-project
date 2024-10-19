const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProgramRegistering = sequelize.define('ProgramRegistering', {
  student_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Student', key: 'student_id' },
    primaryKey: true,
  },
  program_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Program', key: 'program_id' },
    primaryKey: true,
  },
  intake: {
    type: DataTypes.DATE,
    references: { model: 'Intake', key: 'year' },
  },
}, {
  tableName: 'program_registering',
  timestamps: false,
});

module.exports = ProgramRegistering;
