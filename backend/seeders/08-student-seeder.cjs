'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('student', null, {});
    return queryInterface.bulkInsert('student', [
      {
        student_id: 'STU001',
        name: 'Alice Johnson',
        map_location: 'A1-101',
        program_id: 'PROG001',
        intake: '2023',
        acc_id: 'STU001'
      },
      {
        student_id: 'STU002',
        name: 'Bob Wilson',
        map_location: 'B2-202',
        program_id: 'PROG002',
        intake: '2023',
        acc_id: 'STU002'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('student', null, {});
  }
};
