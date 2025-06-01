'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('lecturer', 'acc_id', {
      type: Sequelize.STRING(100),
      references: {
        model: 'iam',
        key: 'acc_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('lecturer', 'acc_id');
  }
}; 