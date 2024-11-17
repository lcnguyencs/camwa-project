'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('iam', {
      acc_id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(45),
      },
      email: {
        type: Sequelize.STRING(45),
      },
      password: {
        type: Sequelize.STRING(45),
      },
      role: {
        type: Sequelize.STRING(45),
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('iam');
  }
};