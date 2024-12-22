'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lecturer', null, {});
    return queryInterface.bulkInsert('lecturer', [
      {
        staff_id: 'STAFF001',
        name: 'John Doe',
        program_id: 'PROG001'
      },
      {
        staff_id: 'STAFF002',
        name: 'Jane Smith',
        program_id: 'PROG002'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lecturer', null, {});
  }
};
