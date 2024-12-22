'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('exam', {
      module_id: {
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
      duration: {
        type: Sequelize.INTEGER,
      },
      proctors: {
        type: Sequelize.STRING(45),
      },
    });

    await queryInterface.addIndex('exam', ['module_id', 'exam_date'], { unique: true });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exam');
  }
};