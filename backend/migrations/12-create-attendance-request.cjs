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
          model: 'student',  // Name of the referenced table
          key: 'student_id'  // Key in the referenced table
        },
        onUpdate: 'CASCADE', // Optional: what to do on update
        onDelete: 'CASCADE', // Optional: what to do on delete
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
        onDelete: 'SET NULL', // Optional: what to do on delete
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

    // Create unique index
    await queryInterface.addIndex('attendance_request', 
      ['class_id', 'intake_module_id', 'student_id'], 
      { unique: true, name: 'unique_attendance_request_index' }
    );

    // Additional indexes
    await queryInterface.addIndex('attendance_request', ['student_id']);
    await queryInterface.addIndex('attendance_request', ['request_date']);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendance_request');
  }
};