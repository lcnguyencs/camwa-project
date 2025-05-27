import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';
import Class from './Class.model.js';

const Attendance = sequelize.define('Attendance', {
  attendance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Student', key: 'student_id' },
  },
  intake_module_id: {
    type: DataTypes.STRING(36),
    references: { model: 'IntakeModules', key: 'intake_module_id' },
  },
  class_id: {
    type: DataTypes.STRING(36),
    references: { model: 'Class', key: 'class_id' },
  },
  class_date: {
    type: DataTypes.DATE,
  },
  attendance_status: {
    type: DataTypes.ENUM('present', 'absent', 'late', 'excused'),
    allowNull: false 
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'attendance',
  timestamps: false,
  indexes: [
    { fields: ['student_id'] },
    { fields: ['intake_module_id'] },
    { fields: ['class_id'] }
  ]
});

// Define the association with Class model
Attendance.belongsTo(Class, {
  foreignKey: 'class_id',
  targetKey: 'class_id'
});

export default Attendance;
