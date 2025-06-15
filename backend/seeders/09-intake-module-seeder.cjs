'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('intake_module', null, {});
    return queryInterface.bulkInsert('intake_module', [
      {        intake_module_id: 'IM001',
        name: 'Programming Fundamentals',
        capacity: 30,
        ects: 6,
        lecturer_id: 'STAFF001',
        program_id: 'PROG001',
        module_id: 'MOD001',
        intake: '2023',
        semester_id: 'SEM001'
      },
      {        intake_module_id: 'IM002',
        name: 'Database Design',
        capacity: 25,
        ects: 6,
        lecturer_id: 'STAFF002',
        program_id: 'PROG002',
        module_id: 'MOD002',
        intake: '2023',
        semester_id: 'SEM001'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('intake_module', null, {});
  }
};
