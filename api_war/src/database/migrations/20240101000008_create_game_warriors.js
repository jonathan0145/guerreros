export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('game_warriors', {
    game_warrior_id: {
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
    position: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    current_health: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    max_health: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    damage_dealt: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    damage_taken: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
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
  await queryInterface.dropTable('game_warriors');
}