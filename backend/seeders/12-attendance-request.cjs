'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attendance_request', null, {});
    return queryInterface.bulkInsert('attendance_request', [
      {
        student_id: 'STU001',
        class_id: '7a34ee3d-3fe4-49d1-8e15-3a251ddf8e5f',
        intake_module_id: 'IM001',
        lecturer_id: 'STAFF001',
        request_date: '2023-09-14',
        status: 'pending',
        reason: 'Medical appointment'
      },
      {
        student_id: 'STU002',
        class_id: '24ee01f1-25b4-43fd-a8af-071bc705311e',
        intake_module_id: 'IM002',
        lecturer_id: 'STAFF002',
        request_date: '2023-09-15',
        status: 'approved',
        reason: 'Family emergency'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attendance_request', null, {});
  }
};
