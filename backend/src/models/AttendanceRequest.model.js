import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const AttendanceRequest = sequelize.define('AttendanceRequest', {
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  student_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Student', key: 'student_id' },
    allowNull: false,
  },
  class_id: {  
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  intake_module_id: {  
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  lecturer_id: {
    type: DataTypes.STRING(20),
    references: { model: 'Lecturer', key: 'staff_id' },
  },
  request_date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'pending',
  },
  reason: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'attendance_request',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['request_id', 'class_id', 'intake_module_id', 'student_id'], 
      name: 'unique_attendance_request_index'
    }
  ]
});

export default AttendanceRequest;
