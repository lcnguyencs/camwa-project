'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('semester', null, {});
    return queryInterface.bulkInsert('semester', [
      {
        sem_id: 'WS2025',
        start_date: '2025-09-01',
        end_date: '2026-02-28'
      }
      // {
      //   sem_id: 'SEM002',
      //   start_date: '2024-01-01',
      //   end_date: '2024-05-31'
      // }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('semester', null, {});
  }
};
