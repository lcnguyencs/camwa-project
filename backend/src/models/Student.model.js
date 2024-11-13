import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

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
  acc_id: {
    type: DataTypes.STRING(100),
    references: { model: 'iam', key: 'acc_id' },
  }
}, {
  tableName: 'student',
  timestamps: false,
});

export default Student;
