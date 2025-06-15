'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create a modified version of 09-create-intake-module.cjs
    // that uses module_id instead of course_id
    await queryInterface.createTable('intake_module', {
      intake_module_id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ects: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lecturer_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'lecturer', 
          key: 'lecturer_id'     
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      program_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'program', 
          key: 'program_id'     
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },      module_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'module',     
          key: 'module_id'     
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      intake: {
        type: Sequelize.INTEGER,
        references: {
          model: 'intake',       
          key: 'year'            
        },
        onUpdate: 'CASCADE',     
        onDelete: 'SET NULL',     
      },
      semester_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'semester',    
          key: 'sem_id'        
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('intake_module');
  }
};
