import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';
import Lecturer from './Lecturer.model.js';

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

// Hash the password before saving the user to the IAM table
Iam.beforeCreate(async (iam, options) => {
  if (iam.password) {
    // Hash password before storing it
    iam.password = await bcrypt.hash(iam.password, 10);
  }
});

// IAM belongs to Lecturer (acc_id corresponds to staff_id)
Iam.belongsTo(Lecturer, {
  foreignKey: 'acc_id',
  targetKey: 'staff_id',
  as: 'lecturer',  // Alias for the relationship
});

export default Iam;
