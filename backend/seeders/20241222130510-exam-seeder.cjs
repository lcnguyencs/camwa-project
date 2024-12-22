'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exam', null, {});
    return queryInterface.bulkInsert('exam', [
      {
        module_id: 'IM001',
        exam_date: '2023-12-15',
        duration: 120,
        proctors: 'John Doe, Jane Smith'
      },
      {
        module_id: 'IM002',
        exam_date: '2023-12-20',
        duration: 180,
        proctors: 'Alice Brown, Bob Wilson'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('exam', null, {});
  }
};
