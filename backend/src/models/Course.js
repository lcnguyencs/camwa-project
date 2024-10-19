const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course', {
  course_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lecturer_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  program_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  intake: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  semester_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
  }
}, {
  timestamps: false,  // Disable createdAt and updatedAt fields
  tableName: 'course'  // Table name in the database
});

module.exports = Course;
