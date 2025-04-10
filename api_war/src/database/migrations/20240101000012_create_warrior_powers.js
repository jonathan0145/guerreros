export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('warrior_powers', {
    warrior_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'warriors',
        key: 'warrior_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    power_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'powers',
        key: 'power_id'
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
  await queryInterface.dropTable('warrior_powers');
}