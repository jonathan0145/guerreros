export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('profiles', {
    profile_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    profile_name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    profile_last_name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    profile_document: {
      type: Sequelize.STRING(11),
      allowNull: true,
      unique: true
    },
    profile_email: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true
    },
    profile_phone: {
      type: Sequelize.STRING(11),
      allowNull: true
    },
    profile_photo: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    profile_address: {
      type: Sequelize.STRING(30),
      allowNull: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  await queryInterface.dropTable('profiles');
}