'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_statuses', [
      {
        user_status_name: 'Active',
        user_status_description: 'User account is active and can access the system',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_status_name: 'Inactive',
        user_status_description: 'User account is temporarily disabled',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_status_name: 'Banned',
        user_status_description: 'User account is permanently banned from the system',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_statuses', {
      user_status_name: ['Active', 'Inactive', 'Banned']
    }, {});
  }
}; 