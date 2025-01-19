'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('facility_faculty', {
      staff_id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
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
      account_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'iam',
          key: 'acc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('facility_faculty');
  }
};
