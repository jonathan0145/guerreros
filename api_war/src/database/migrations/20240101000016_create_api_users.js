export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('api_users', {
    api_user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    api_user: {
      type: Sequelize.STRING(60),
      allowNull: false,
      unique: true
    },
    api_password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    api_role: {
      type: Sequelize.ENUM('admin', 'read-only'),
      allowNull: false,
      defaultValue: 'read-only'
    },
    api_status: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'active'
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('api_users');
}