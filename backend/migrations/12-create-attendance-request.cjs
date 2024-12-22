'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('attendance_request', {
      request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      class_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'class',
          key: 'class_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      intake_module_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'intake_module',
          key: 'intake_module_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      lecturer_id: {
        type: Sequelize.STRING(20),
        references: {
          model: 'lecturer',
          key: 'staff_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', 
      },
      request_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.STRING(10),
        defaultValue: 'pending',
      },
      reason: {
        type: Sequelize.TEXT,
      },
    });

    try {
      await queryInterface.addIndex('attendance_request',
        ['class_id', 'intake_module_id', 'student_id'],
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
    await queryInterface.addIndex('attendance_request', ['request_date']);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendance_request');
  }
};