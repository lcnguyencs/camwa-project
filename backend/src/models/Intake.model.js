// Intake.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const Intake = sequelize.define('Intake', {
  year: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'intake',
  timestamps: false
});

export default Intake;
