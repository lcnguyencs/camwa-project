'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('class', {
      class_id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      intake_module_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'intake_module',  // Name of the referenced table
          key: 'intake_module_id'  // Key in the referenced table
        },
        onUpdate: 'CASCADE', // Optional: what to do on update
        onDelete: 'CASCADE', // Optional: what to do on delete
      },
      class_date: {
        type: Sequelize.DATE,
      },
      start_time: {
        type: Sequelize.TIME,
      },
      end_time: {
        type: Sequelize.TIME,
      },
      lecturer_id: {
        type: Sequelize.STRING(20),
        allowNull: true,
        references: {
          model: 'lecturer',  // Name of the referenced table
          key: 'staff_id'    // Key in the referenced table
        },
        onUpdate: 'CASCADE', // Optional: what to do on update
        onDelete: 'SET NULL', // Optional: what to do on delete
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('class');
  }
};