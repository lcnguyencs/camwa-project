'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

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
          key: 'staff_id'     
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',     
          key: 'course_id'     
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      intake_year: {
        type: Sequelize.STRING,
        allowNull: false,
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