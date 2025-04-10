export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('powers', {
    power_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    percentage: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0.00
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
  await queryInterface.dropTable('powers');
}