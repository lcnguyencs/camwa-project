'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update John Doe (STAFF001) with LEC001
    await queryInterface.bulkUpdate('lecturer', 
      { acc_id: 'LEC001' },
      { staff_id: 'STAFF001' }
    );

    // Update Jane Smith (STAFF002) with LEC002
    await queryInterface.bulkUpdate('lecturer', 
      { acc_id: 'LEC002' },
      { staff_id: 'STAFF002' }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the acc_id values
    await queryInterface.bulkUpdate('lecturer', 
      { acc_id: null },
      { staff_id: ['STAFF001', 'STAFF002'] }
    );
  }
}; 