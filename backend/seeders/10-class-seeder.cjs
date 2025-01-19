'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('class', null, {});
    return queryInterface.bulkInsert('class', [
      {
        class_id: '7a34ee3d-3fe4-49d1-8e15-3a251ddf8e5f', 
        intake_module_id: 'IM001',
        class_number: 1,
        class_date: '2023-09-15',
        start_time: '09:00:00',
        end_time: '11:00:00',
        lecturer_id: 'STAFF001'
      },
      {
        class_id: '24ee01f1-25b4-43fd-a8af-071bc705311e', 
        intake_module_id: 'IM002',
        class_number: 2,
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
