import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const ExamTaking = sequelize.define('ExamTaking', {
  student_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    references: { model: 'Student', key: 'student_id' },
    allowNull: false,
  },
  intake_module_id: {  
    type: DataTypes.STRING(36),
    primaryKey: true,
    references: { model: 'IntakeModules', key: 'intake_module_id' },
    allowNull: false,
  },
  exam_date: {
    type: DataTypes.DATE,
    primaryKey: true,
    allowNull: false,
  },
  is_eligible: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'exam_taking',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['student_id', 'intake_module_id', 'exam_date'], 
    }
  ]
});

export default ExamTaking;
