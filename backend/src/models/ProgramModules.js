const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProgramModules = sequelize.define('ProgramModules', {
  program_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Program', key: 'program_id' },
    primaryKey: true,
  },
  module_id: {
    type: DataTypes.STRING(36),
    references: { model: 'Module', key: 'module_id' },
    primaryKey: true,
  },
  sem_id: {
    type: DataTypes.STRING(36),
    references: { model: 'Semester', key: 'sem_id' },
    primaryKey: true,
  },
  intake: {
    type: DataTypes.DATE,
    references: { model: 'Intake', key: 'year' },
  },
}, {
  tableName: 'program_modules',
  timestamps: false,
});

module.exports = ProgramModules;
