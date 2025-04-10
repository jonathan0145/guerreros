export async function up(queryInterface, Sequelize) {
  try {
    await queryInterface.bulkInsert('user_statuses', [
      {
        user_status_name: 'active',
        user_status_description: 'Active user account',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_status_name: 'inactive',
        user_status_description: 'Inactive user account',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_status_name: 'banned',
        user_status_description: 'Banned user account',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  } catch (error) {
    console.error('Error seeding user_statuses:', error);
    throw error;
  }
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('user_statuses', null, {});
}