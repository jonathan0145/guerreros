'use strict';
import bcrypt from 'bcryptjs';

export default {
  async up(queryInterface, Sequelize) {
    // Obtener el ID del estado "Active"
    const [userStatus] = await queryInterface.sequelize.query(
      `SELECT user_status_id FROM user_statuses WHERE user_status_name = 'Active'`
    );
    const activeStatusId = userStatus[0].user_status_id;

    // Verificar usuarios existentes
    const [existingUsers] = await queryInterface.sequelize.query(
      `SELECT user_user FROM users WHERE user_user IN ('admin', 'user1', 'user2')`
    );
    const existingUsernames = existingUsers.map(user => user.user_user);

    // Crear usuarios con contraseñas hasheadas
    const users = [
      {
        user_user: 'admin',
        user_password: await bcrypt.hash('admin123', 10),
        user_status_fk: activeStatusId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_user: 'user1',
        user_password: await bcrypt.hash('user123', 10),
        user_status_fk: activeStatusId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_user: 'user2',
        user_password: await bcrypt.hash('user123', 10),
        user_status_fk: activeStatusId,
        created_at: new Date(),
        updated_at: new Date()
      }
    ].filter(user => !existingUsernames.includes(user.user_user));

    if (users.length > 0) {
      await queryInterface.bulkInsert('users', users, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
}; 