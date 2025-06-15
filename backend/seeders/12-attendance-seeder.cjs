'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attendance', null, {});
    return queryInterface.bulkInsert('attendance', [
      {
        student_id: 'STU001',
        intake_module_id: 'IM001',
        module_id: 'MODULE001',
        class_date: '2023-09-15',
        attendance_status: 'present',
        is_deleted: false
      },
      {
        student_id: 'STU002',
        intake_module_id: 'IM002',
        module_id: 'MODULE002',
        class_date: '2023-09-16',
        attendance_status: 'absent',
        is_deleted: false
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attendance', null, {});
  }
};
