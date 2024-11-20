'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('program_registering', {
      student_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'student',     // Name of the referenced table
          key: 'student_id'     // Key in the referenced table
        },
        onUpdate: 'CASCADE',   // Optional: what to do on update
        onDelete: 'CASCADE',   // Optional: what to do on delete
      },
      program_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'program',     // Name of the referenced table
          key: 'program_id'     // Key in the referenced table
        },
        onUpdate: 'CASCADE',   // Optional: what to do on update
        onDelete: 'CASCADE',   // Optional: what to do on delete
      },
      intake: {
        type: Sequelize.DATE,
        references: {
          model: 'intake',      // Name of the referenced table
          key: 'year'           // Key in the referenced table
        },
        onUpdate: 'CASCADE',   // Optional: what to do on update
        onDelete: 'SET NULL',  // Optional: what to do on delete
      },
    });

    // Create unique index
    await queryInterface.addIndex('program_registering', ['student_id', 'program_id'], { unique: true });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('program_registering');
  }
};