'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendance_request', {
      request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attendance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'attendance',
          key: 'attendance_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      student_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'student',  
          key: 'student_id'  
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      module_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'module',
          key: 'module_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      request_status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      proposed_status: {
        type: Sequelize.ENUM('present', 'absent', 'late', 'excused'),
        allowNull: false,
      },
      approved_status: {
        type: Sequelize.ENUM('present', 'absent', 'late', 'excused'),
        allowNull: true,
      },
      reason: {
        type: Sequelize.TEXT,
      },
      processed_by: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      processed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });    try {
      await queryInterface.addIndex('attendance_request',
        ['attendance_id'],
        { unique: true, name: 'unique_attendance_request_index' }
      );
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('Index already exists, skipping creation.');
      } else {
        throw error; 
      }
    }


    await queryInterface.addIndex('attendance_request', ['student_id']);
    await queryInterface.addIndex('attendance_request', ['module_id']);
  },
    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendance_request');
  }
};