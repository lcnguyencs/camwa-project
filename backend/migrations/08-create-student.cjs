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
          model: 'program',      // Name of the referenced table
          key: 'program_id'      // Key in the referenced table
        },
        onUpdate: 'CASCADE',     // Optional: what to do on update
        onDelete: 'SET NULL',     // Optional: what to do on delete
      },
      intake: {
        type: Sequelize.DATE,
        references: {
          model: 'intake',       // Name of the referenced table
          key: 'year'            // Key in the referenced table
        },
        onUpdate: 'CASCADE',     // Optional: what to do on update
        onDelete: 'SET NULL',     // Optional: what to do on delete
      },
      acc_id: {
        type: Sequelize.STRING(100),
        references: {
          model: 'iam',          // Name of the referenced table
          key: 'acc_id'          // Key in the referenced table
        },
        onUpdate: 'CASCADE',     // Optional: what to do on update
        onDelete: 'SET NULL',     // Optional: what to do on delete
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student');
  }
};