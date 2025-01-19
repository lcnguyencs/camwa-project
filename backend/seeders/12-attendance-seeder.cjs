'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attendance', null, {});
    return queryInterface.bulkInsert('attendance', [
      {
        student_id: 'STU001',
        intake_module_id: 'IM001',
        class_id: '7a34ee3d-3fe4-49d1-8e15-3a251ddf8e5f',
        class_date: '2023-09-15',
        attendance_status: 'present',
        is_deleted: false
      },
      {
        student_id: 'STU002',
        intake_module_id: 'IM002',
        class_id: '24ee01f1-25b4-43fd-a8af-071bc705311e',
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
