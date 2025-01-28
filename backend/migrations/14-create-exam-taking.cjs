'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exam_taking', {
      student_id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        references: {
          model: 'student',  
          key: 'student_id'  
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      intake_module_id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        references: {
          model: 'intake_module',  
          key: 'intake_module_id'  
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      exam_date: {
        type: Sequelize.DATE,
        primaryKey: true,
        allowNull: false,
      },
      is_eligible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });

    //redundant since we have a composite primary key but can keep for documentation
    await queryInterface.addIndex('exam_taking', ['student_id', 'intake_module_id', 'exam_date'], { unique: true });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exam_taking');
  }
};
