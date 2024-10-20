import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

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

export default ProgramRegistering;
