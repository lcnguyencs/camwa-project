'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('iam', null, {});
    return queryInterface.bulkInsert('iam', [
      {
        acc_id: 'ACC001',
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'ADMIN'
      },
      {
        acc_id: 'ACC002',
        username: 'lecturer1',
        email: 'lecturer1@example.com',
        password: 'lecturer123',
        role: 'LECTURER'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('iam', null, {});
  }
};