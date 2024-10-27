import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const ProgramRegistering = sequelize.define('ProgramRegistering', {
  student_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Student', key: 'student_id' },
    allowNull: false,
  },
  program_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Program', key: 'program_id' },
    allowNull: false,
  },
  intake: {
    type: DataTypes.DATE,
    references: { model: 'Intake', key: 'year' },
  },
}, {
  tableName: 'program_registering',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['student_id', 'program_id'],
    }
  ]
});

export default ProgramRegistering;
