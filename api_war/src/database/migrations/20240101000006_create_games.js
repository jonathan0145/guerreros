export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('games', {
    game_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    game_mode: {
      type: Sequelize.ENUM('power', 'magic', 'health'),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('waiting', 'in_progress', 'finished'),
      allowNull: false,
      defaultValue: 'waiting'
    },
    created_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    winner_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    current_turn: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    round: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    started_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    finished_at: {
      type: Sequelize.DATE,
      allowNull: true
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
  await queryInterface.dropTable('games');
}