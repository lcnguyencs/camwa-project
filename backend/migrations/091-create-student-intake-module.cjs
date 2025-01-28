'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_intake_module', {
      student_id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        references: {
          model: 'student',
          key: 'student_id'
        }
      },
      intake_module_id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        references: {
          model: 'intake_module',
          key: 'intake_module_id'
        }
      },
      enrollment_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_intake_module');
  }
};
