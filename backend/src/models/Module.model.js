import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const Module = sequelize.define('Module', {
  module_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ects: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // Reference to the lecturer responsible for this module
  lecturer_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Lecturer', key: 'staff_id' },
    allowNull: false,
  },

  // Reference to the course this module belongs to
  course_id: {
    type: DataTypes.INTEGER,
    references: { model: 'Course', key: 'course_id' },
    allowNull: false,
  },
  // Reference to the intake for which this module is shared
  intake: {
    type: DataTypes.DATE,
    references: { model: 'Intake', key: 'year' },
    allowNull: false,
  },
}, {
  tableName: 'module',
  timestamps: false,
});

export default Module;
