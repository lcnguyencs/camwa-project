// intakeModule.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const IntakeModule = sequelize.define('IntakeModule', {
  intake_module_id: {
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
  // Reference to the lecturer responsible for this intake module
  lecturer_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Lecturer', key: 'staff_id' },
    allowNull: false,
  },
  // Reference to the course this intake module belongs to
  course_id: {
    type: DataTypes.INTEGER,
    references: { model: 'Course', key: 'course_id' },
    allowNull: false,
  },
  // Reference to the intake year for this module
  intake_year: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Reference to the semester of the module
  semester_id: {
    type: DataTypes.STRING(36),
    references: { model: 'Semester', key: 'sem_id' },
    allowNull: false,
  },
}, {
  tableName: 'intake_module',
  timestamps: false,
});

export default IntakeModule;
