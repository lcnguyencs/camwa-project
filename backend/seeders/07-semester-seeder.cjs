'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('semester', null, {});
    return queryInterface.bulkInsert('semester', [
      {
        sem_id: 'SEM001',
        sem_type: 'Fall',
        start_date: '2023-09-01',
        end_date: '2023-12-31'
      },
      {
        sem_id: 'SEM002',
        sem_type: 'Spring',
        start_date: '2024-01-01',
        end_date: '2024-05-31'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('semester', null, {});
  }
};
