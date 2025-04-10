export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('spells', {
    spell_id: {
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
    mana_cost: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    effect: {
      type: Sequelize.STRING(50),
      allowNull: false
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
  await queryInterface.dropTable('spells');
}