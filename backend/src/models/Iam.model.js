import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const Iam = sequelize.define('Iam', {
  acc_id: {
    type: DataTypes.STRING(100),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(45),
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'iam',
  timestamps: false,
});


export default Iam;
