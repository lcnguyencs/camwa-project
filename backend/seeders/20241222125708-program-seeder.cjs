'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('program', null, {});
    return queryInterface.bulkInsert('program', [
      {
        program_id: 'PROG001',
        name: 'Computer Science',
        duration: 4
      },
      {
        program_id: 'PROG002',
        name: 'Information Technology',
        duration: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('program', null, {});
  }
};
