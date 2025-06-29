'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('intake', null, {});    
    return queryInterface.bulkInsert('intake', [
      {
        year: 2021
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('intake', null, {});
  }
};
