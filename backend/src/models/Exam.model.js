import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const Exam = sequelize.define('Exam', {
  module_id: {
    type: DataTypes.STRING(36),
    references: { model: 'IntakeModule', key: 'intake_module_id' },
    allowNull: false,
  },
  exam_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  proctors: {
    type: DataTypes.STRING(45),
  },
}, {
  tableName: 'exam',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['module_id', 'exam_date'],
    }
  ]
});

export default Exam;
