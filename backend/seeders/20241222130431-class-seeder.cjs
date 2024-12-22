'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('class', null, {});
    return queryInterface.bulkInsert('class', [
      {
        class_id: 'CLS001',
        intake_module_id: 'IM001',
        class_date: '2023-09-15',
        start_time: '09:00:00',
        end_time: '11:00:00',
        lecturer_id: 'STAFF001'
      },
      {
        class_id: 'CLS002',
        intake_module_id: 'IM002',
        class_date: '2023-09-16',
        start_time: '14:00:00',
        end_time: '16:00:00',
        lecturer_id: 'STAFF002'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('class', null, {});
  }
};
