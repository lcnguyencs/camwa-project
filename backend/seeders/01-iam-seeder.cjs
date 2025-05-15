'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const hashedLecturerPassword = await bcrypt.hash('lecturer123', salt);
    const hashedStudentPassword = await bcrypt.hash('student123', salt);
    const hashedFacultyPassword = await bcrypt.hash('faculty123', salt);

    await queryInterface.bulkDelete('iam', null, {});
    return queryInterface.bulkInsert('iam', [
      {
        acc_id: 'ADMIN001',
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN'
      },
      {
        acc_id: 'LEC001',
        username: 'lecturer1',
        email: 'lecturer1@example.com',
        password: hashedLecturerPassword,
        role: 'LECTURER'
      },
      {
        acc_id: 'LEC002',
        username: 'lecturer2',
        email: 'lecturer2@example.com',
        password: hashedLecturerPassword,
        role: 'LECTURER'
      },
      {
        acc_id: 'STU001',
        username: 'student1',
        email: 'student1@example.com',
        password: hashedStudentPassword,
        role: 'STUDENT'
      },
      {
        acc_id: 'STU002',
        username: 'student2',
        email: 'student2@example.com',
        password: hashedStudentPassword,
        role: 'STUDENT'
      },
      {
        acc_id: 'FAC001',
        username: 'faculty1',
        email: 'faculty1@example.com',
        password: hashedFacultyPassword,
        role: 'FACULTY'
      },
      {
        acc_id: 'FAC002',
        username: 'faculty2',
        email: 'faculty2@example.com',
        password: hashedFacultyPassword,
        role: 'FACULTY'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('iam', null, {});
  }
};
