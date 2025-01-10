'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attendance_request', null, {});
    return queryInterface.bulkInsert('attendance_request', [
      {
        student_id: 'STU001',
        class_id: 'CLS001',
        intake_module_id: 'IM001',
        lecturer_id: 'STAFF001',
        request_date: '2023-09-14',
        status: 'pending',
        reason: 'Medical appointment'
      },
      {
        student_id: 'STU002',
        class_id: 'CLS002',
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
