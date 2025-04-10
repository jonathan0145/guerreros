export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('user_statuses', {
    user_status_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_status_name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    user_status_description: {
      type: Sequelize.STRING(80),
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
  await queryInterface.dropTable('user_statuses');
}