import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const Module = sequelize.define('Module', {
  module_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  capacity: {
    type: DataTypes.INTEGER,
  },
  ects: {
    type: DataTypes.INTEGER,
  },
  lecturer_id: {
    type: DataTypes.STRING(20),
    references: { model: 'lecture', key: 'staff_id' },
  },
}, {
  tableName: 'module',
  timestamps: false,
});

export default Module;
