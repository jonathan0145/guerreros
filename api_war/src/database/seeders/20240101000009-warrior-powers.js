export async function up(queryInterface, Sequelize) {
  const warriors = Array.from({ length: 20 }, (_, i) => i + 1);
  const powers = [1, 2, 3, 4]; // IDs de los poderes existentes
  
  const warriorPowers = [];
  
  warriors.forEach(warriorId => {
    // Asignar 2 poderes aleatorios a cada guerrero
    const randomPowers = powers
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    randomPowers.forEach(powerId => {
      warriorPowers.push({
        warrior_id: warriorId,
        power_id: powerId,
        created_at: new Date(),
        updated_at: new Date()
      });
    });
  });

  await queryInterface.bulkInsert('warrior_powers', warriorPowers);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('warrior_powers', null, {});
}