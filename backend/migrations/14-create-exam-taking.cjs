'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('exam_taking', {
      student_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'student',  
          key: 'student_id'  
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
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