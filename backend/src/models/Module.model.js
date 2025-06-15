import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const Module = sequelize.define('Module', {
  module_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },  
  lecturer_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: { model: 'Lecturer', key: 'lecturer_id' },
  },
  program_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: { model: 'Program', key: 'program_id' },
  },
  intake: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Intake', key: 'year' },
  },
  semester_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: { model: 'Semester', key: 'sem_id' },
  },
   camera_path: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },  
}, {
  timestamps: false,  // Disable createdAt and updatedAt fields
  tableName: 'module'  // Table name in the database
});

export default Module;
