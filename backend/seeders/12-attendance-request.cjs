'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attendance_request', null, {});
    
    // First, get the attendance IDs to reference
    const attendances = await queryInterface.sequelize.query(
      `SELECT attendance_id FROM attendance LIMIT 3`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    if (attendances.length < 2) {
      console.log('Warning: Not enough attendance records found to seed attendance_requests');
      return Promise.resolve();
    }
    
    const now = new Date();
    
    return queryInterface.bulkInsert('attendance_request', [
      {
        attendance_id: attendances[0].attendance_id,
        student_id: 'STU001',
        module_id: 'MOD001',
        request_status: 'pending',
        proposed_status: 'excused',
        reason: 'Medical appointment',
        created_at: now
      },
      {
        attendance_id: attendances[1].attendance_id,
        student_id: 'STU002',
        module_id: 'MOD002',
        request_status: 'approved',
        proposed_status: 'excused',
        approved_status: 'excused',
        reason: 'Family emergency',
        processed_by: 'ADMIN',
        processed_at: now,
        created_at: now
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attendance_request', null, {});
  }
};
