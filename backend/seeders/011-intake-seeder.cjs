'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('intake', null, {});
    return queryInterface.bulkInsert('intake', [
      {
        year: '2023'
      },
      {
        year: '2024'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('intake', null, {});
  }
};
