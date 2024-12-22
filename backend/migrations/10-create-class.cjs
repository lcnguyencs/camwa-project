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
          model: 'intake_module',  
          key: 'intake_module_id'  
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
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
          model: 'lecturer',  
          key: 'staff_id'    
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL', 
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('class');
  }
};