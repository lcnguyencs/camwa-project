import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';
import Iam from './Iam.model.js';

const Lecturer = sequelize.define('Lecturer', {
  staff_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  program_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: { model: 'Program', key: 'program_id' },
  }
}, {
  timestamps: false,
  tableName: 'lecturer'
});

// Lecturer has one IAM record (staff_id corresponds to acc_id)
Lecturer.hasOne(Iam, {
  foreignKey: 'acc_id',
  sourceKey: 'staff_id',
  as: 'iamAccount',  // Alias for the relationship
});

export default Lecturer;
