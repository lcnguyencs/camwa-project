'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('student', {
      student_id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(40),
      },
      map_location: {
        type: Sequelize.STRING(20),
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
        type: Sequelize.STRING,
        references: {
          model: 'intake',       
          key: 'year'            
        },
        onUpdate: 'CASCADE',     
        onDelete: 'SET NULL',     
      },
      acc_id: {
        type: Sequelize.STRING(100),
        references: {
          model: 'iam',         
          key: 'acc_id'          
        },
        onUpdate: 'CASCADE',     
        onDelete: 'SET NULL',     
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student');
  }
};