'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('facility_faculty', null, {});
    return queryInterface.bulkInsert('facility_faculty', [
      {
        staff_id: 'STAFF003',
        name: 'Alice Johnson',
        program_id: 'PROG001',
        account_id: 'FAC001'
      },
      {
        staff_id: 'STAFF004',
        name: 'Bob Brown',
        program_id: 'PROG002',
        account_id: 'FAC002'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('facility_faculty', null, {});
  }
};
