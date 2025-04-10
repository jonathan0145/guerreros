import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  const hashedPassword = await bcrypt.hash('apipass123', 10);

  await queryInterface.bulkInsert('api_users', [
    {
      api_user: 'api_admin',
      api_password: hashedPassword,
      api_role: 'admin',
      api_status: 'active',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      api_user: 'api_reader',
      api_password: hashedPassword,
      api_role: 'read-only',
      api_status: 'active',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('api_users', null, {});
}