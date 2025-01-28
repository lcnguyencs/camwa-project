'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('iam', null, {});
    return queryInterface.bulkInsert('iam', [
      {
        acc_id: 'ADMIN001',
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'ADMIN'
      },
      {
        acc_id: 'LEC001',
        username: 'lecturer1',
        email: 'lecturer1@example.com',
        password: 'lecturer123',
        role: 'LECTURER'
      },
      {
        acc_id: 'LEC002',
        username: 'lecturer2',
        email: 'lecturer2@example.com',
        password: 'lecturer123',
        role: 'LECTURER'
      },
      {
        acc_id: 'STU001',
        username: 'student1',
        email: 'student1@example.com',
        password: 'student123',
        role: 'STUDENT'
      },
      {
        acc_id: 'STU002',
        username: 'student2',
        email: 'student2@example.com',
        password: 'student123',
        role: 'STUDENT'
      },
      {
        acc_id: 'FAC001',
        username: 'faculty1',
        email: 'faculty1@example.com',
        password: 'faculty123',
        role: 'FACULTY'
      },
      {
        acc_id: 'FAC002',
        username: 'faculty2',
        email: 'faculty2@example.com',
        password: 'faculty123',
        role: 'FACULTY'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('iam', null, {});
  }
};