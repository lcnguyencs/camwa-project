'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('intake_module', {
      intake_module_id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ects: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lecturer_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'lecturer',  // Name of the referenced table
          key: 'staff_id'     // Key in the referenced table
        },
        onUpdate: 'CASCADE', // Optional: what to do on update
        onDelete: 'CASCADE', // Optional: what to do on delete
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',     // Name of the referenced table
          key: 'course_id'     // Key in the referenced table
        },
        onUpdate: 'CASCADE', // Optional: what to do on update
        onDelete: 'CASCADE', // Optional: what to do on delete
      },
      intake_year: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      semester_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'semester',    // Name of the referenced table
          key: 'sem_id'        // Key in the referenced table
        },
        onUpdate: 'CASCADE', // Optional: what to do on update
        onDelete: 'CASCADE', // Optional: what to do on delete
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('intake_module');
  }
};