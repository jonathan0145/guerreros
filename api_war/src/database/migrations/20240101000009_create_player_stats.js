export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('player_stats', {
    player_stats_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
    total_games: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    victories: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    defeats: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    draws: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    current_streak: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    longest_streak: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ranking_points: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1000
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
  await queryInterface.dropTable('player_stats');
}