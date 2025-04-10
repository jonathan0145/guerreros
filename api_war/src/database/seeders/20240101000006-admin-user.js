import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await queryInterface.bulkInsert('users', [
    {
      user_user: 'admin',
      user_email: 'admin@wargame.com',
      user_password: hashedPassword,
      user_role: 'admin',
      user_status_fk: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Crear perfil del administrador
  await queryInterface.bulkInsert('profiles', [
    {
      profile_name: 'Admin',
      profile_last_name: 'System',
      profile_email: 'admin@wargame.com',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Crear estadísticas iniciales
  await queryInterface.bulkInsert('player_stats', [
    {
      user_id: 1,
      total_games: 0,
      victories: 0,
      defeats: 0,
      ranking_points: 1000,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('player_stats', { user_id: 1 }, {});
  await queryInterface.bulkDelete('profiles', { user_id: 1 }, {});
  await queryInterface.bulkDelete('users', { user_user: 'admin' }, {});
}