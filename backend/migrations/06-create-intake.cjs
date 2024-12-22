'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('intake', {
      year: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('intake');
  }
};
