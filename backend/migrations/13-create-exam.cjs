'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exam', {
      module_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'intake_module',  // Name of the referenced table
          key: 'intake_module_id' // Key in the referenced table
        },
        onUpdate: 'CASCADE', // Optional: what to do on update
        onDelete: 'CASCADE', // Optional: what to do on delete
      },
      exam_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      proctors: {
        type: Sequelize.STRING(45),
      },
    });

    // Create unique index
    await queryInterface.addIndex('exam', ['module_id', 'exam_date'], { unique: true });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exam');
  }
};