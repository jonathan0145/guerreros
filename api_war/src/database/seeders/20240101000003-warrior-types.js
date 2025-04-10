export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('warrior_types', [
    {
      name: 'Knight',
      description: 'Heavy armored warrior with high defense and melee combat skills',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Mage',
      description: 'Powerful spellcaster with high magical abilities',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Archer',
      description: 'Ranged warrior with high accuracy and agility',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Berserker',
      description: 'Fierce warrior with high attack power but lower defense',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('warrior_types', null, {});
}