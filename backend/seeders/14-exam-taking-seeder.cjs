'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exam_taking', null, {});
    return queryInterface.bulkInsert('exam_taking', [
      {
        student_id: 'STU001',
        intake_module_id: 'IM001',
        exam_date: '2023-12-15',
        is_eligible: true
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('exam_taking', null, {});
  }
};
