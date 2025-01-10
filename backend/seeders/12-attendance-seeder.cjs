'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attendance', null, {});
    return queryInterface.bulkInsert('attendance', [
      {
        student_id: 'STU001',
        intake_module_id: 'IM001',
        class_id: 'CLS001',
        class_date: '2023-09-15',
        attendance_status: 'PRESENT',
        is_deleted: false
      },
      {
        student_id: 'STU002',
        intake_module_id: 'IM002',
        class_id: 'CLS002',
        class_date: '2023-09-16',
        attendance_status: 'PRESENT',
        is_deleted: false
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attendance', null, {});
  }
};
