export async function up(queryInterface, Sequelize) {
  const warriors = Array.from({ length: 20 }, (_, i) => i + 1);
  const spells = [1, 2, 3, 4]; // IDs de los hechizos existentes
  
  const warriorSpells = [];
  
  warriors.forEach(warriorId => {
    // Asignar 2 hechizos aleatorios a cada guerrero
    const randomSpells = spells
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    randomSpells.forEach(spellId => {
      warriorSpells.push({
        warrior_id: warriorId,
        spell_id: spellId,
        created_at: new Date(),
        updated_at: new Date()
      });
    });
  });

  await queryInterface.bulkInsert('warrior_spells', warriorSpells);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('warrior_spells', null, {});
}