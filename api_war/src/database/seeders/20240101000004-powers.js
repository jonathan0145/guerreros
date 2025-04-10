export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('powers', [
    {
      name: 'Double Strike',
      description: 'Attacks twice in one turn',
      percentage: 25.00,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Shield Wall',
      description: 'Increases defense temporarily',
      percentage: 30.00,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Battle Cry',
      description: 'Increases attack power',
      percentage: 20.00,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Quick Recovery',
      description: 'Recovers health over time',
      percentage: 15.00,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('powers', null, {});
}