export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('races', [
    {
      name: 'Human',
      description: 'Versatile and adaptable warriors with balanced attributes',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Elf',
      description: 'Agile and magical beings with enhanced magical abilities',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Orc',
      description: 'Strong and resilient warriors with high power and health',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Dwarf',
      description: 'Sturdy warriors with high defense and crafting abilities',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('races', null, {});
}