'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('program_registering', null, {});
    return queryInterface.bulkInsert('program_registering', [
      {
        student_id: 'STU001',
        program_id: 'PROG001',
        intake: 2023
      },
      {
        student_id: 'STU002',
        program_id: 'PROG002',
        intake: 2024
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('program_registering', null, {});
  }
};
