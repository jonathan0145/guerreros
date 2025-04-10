export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('game_players', {
    game_player_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    game_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'games',
        key: 'game_id'
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
    warrior_ids: {
      type: Sequelize.JSON,
      allowNull: false
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ready: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
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

  // Añadir índice único para game_id y user_id
  await queryInterface.addIndex('game_players', ['game_id', 'user_id'], {
    unique: true
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('game_players');
}