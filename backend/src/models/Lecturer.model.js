import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';


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
  },
  acc_id: {
    type: DataTypes.STRING(100),
    references: {
      model: 'iam',
      key: 'acc_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
}, {
  timestamps: false,
  tableName: 'lecturer'
});

export default Lecturer;
