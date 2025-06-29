'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const hashedLecturerPassword = await bcrypt.hash('lecturer123', salt);
    const hashedStudentPassword = await bcrypt.hash('student123', salt);
    const hashedFacultyPassword = await bcrypt.hash('faculty123', salt);
    const hashedACPassword = await bcrypt.hash('sonll', salt);

    await queryInterface.bulkDelete('iam', null, {});
    return queryInterface.bulkInsert('iam', [
      {
        iam_id: 'ADMIN001',
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN'
      },
      {
        iam_id: 'FAC001',
        username: 'faculty1',
        email: 'faculty1@example.com',
        password: hashedFacultyPassword,
        role: 'FACULTY'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('iam', null, {});
  }
};
