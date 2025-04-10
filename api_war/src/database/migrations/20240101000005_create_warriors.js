export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('warriors', {
    warrior_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    warrior_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    race_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'races',
        key: 'race_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'warrior_types',
        key: 'type_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
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
    power: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    magic: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    health: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1000
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    experience: {
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
  await queryInterface.dropTable('warriors');
}