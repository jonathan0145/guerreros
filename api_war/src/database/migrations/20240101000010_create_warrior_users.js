export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('warrior_users', {
    warrior_user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    warrior_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'warriors',
        key: 'warrior_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    }
  });

  // Añadir índice único para warrior_id y user_id
  await queryInterface.addIndex('warrior_users', ['warrior_id', 'user_id'], {
    unique: true
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('warrior_users');
}