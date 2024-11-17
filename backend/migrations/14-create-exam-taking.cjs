'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exam_taking', {
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
      exam_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_eligible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });

    // Create unique index
    await queryInterface.addIndex('exam_taking', ['student_id', 'intake_module_id', 'exam_date'], { unique: true });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exam_taking');
  }
};