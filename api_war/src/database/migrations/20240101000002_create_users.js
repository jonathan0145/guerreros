export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_user: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    user_email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    user_password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    user_role: {
      type: Sequelize.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false
    },
    user_status_fk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_statuses',
        key: 'user_status_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
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
  await queryInterface.dropTable('users');
}