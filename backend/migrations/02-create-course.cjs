'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('course', {
      course_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lecturer_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      program_id: {
        type: Sequelize.STRING(20),
        references: {
          model: 'program',      
          key: 'program_id'      
        },
        onUpdate: 'CASCADE',     
        onDelete: 'SET NULL',     
      },
      intake: {
        type: Sequelize.INTEGER,
        references: {
          model: 'intake',       
          key: 'year'            
        },
      },
      semester_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('course');
  }
};