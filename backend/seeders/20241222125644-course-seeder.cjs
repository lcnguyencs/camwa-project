'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('course', null, {});
    return queryInterface.bulkInsert('course', [
      { course_id: 1,
        name: 'Introduction to Programming',
        lecturer_id: 'STAFF001',
        program_id: 'PROG001',
        intake: '2023',
        semester_id: 'SEM001'
      },
      {
        course_id: 2,
        name: 'Database Systems',
        lecturer_id: 'STAFF002',
        program_id: 'PROG002',
        intake: '2023',
        semester_id: 'SEM001'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course', null, {});
  }
};
