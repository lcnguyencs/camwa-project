import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';
import Student from './Student.model.js';
import Module from './Module.model.js';
import Semester from './Semester.model.js';
import Program from './Program.model.js';
import Lecturer from './Lecturer.model.js';

const ProgramRegistration = sequelize.define('ProgramRegistration', {
  module_reg_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 'Student',
      key: 'student_id'
    },
  },
  module_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: 'Module',
      key: 'module_id'
    },
  },
  module_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  semester_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: 'Semester',
      key: 'sem_id'
    },
  },
  program_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 'Program',
      key: 'program_id'
    },
  },
  lecturer_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 'Lecturer',
      key: 'lecturer_id'
    },
  },
}, {
  tableName: 'program_registration',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Define associations
ProgramRegistration.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(ProgramRegistration, { foreignKey: 'student_id' });

ProgramRegistration.belongsTo(Module, { foreignKey: 'module_id' });
Module.hasMany(ProgramRegistration, { foreignKey: 'module_id' });

ProgramRegistration.belongsTo(Semester, { foreignKey: 'semester_id' });
Semester.hasMany(ProgramRegistration, { foreignKey: 'semester_id' });

ProgramRegistration.belongsTo(Program, { foreignKey: 'program_id' });
Program.hasMany(ProgramRegistration, { foreignKey: 'program_id' });

ProgramRegistration.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });
Lecturer.hasMany(ProgramRegistration, { foreignKey: 'lecturer_id' });

export default ProgramRegistration;
