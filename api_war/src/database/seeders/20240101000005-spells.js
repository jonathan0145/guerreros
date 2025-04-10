export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('spells', [
    {
      name: 'Bola de Fuego',
      description: 'Lanza una poderosa bola de fuego que causa daño en área',
      mana_cost: 50,
      effect: 'damage_area',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Escudo de Hielo',
      description: 'Crea una barrera protectora de hielo',
      mana_cost: 40,
      effect: 'shield',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Rayo',
      description: 'Invoca un rayo que causa daño a un objetivo',
      mana_cost: 30,
      effect: 'damage_single',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Curación',
      description: 'Restaura puntos de vida al objetivo',
      mana_cost: 45,
      effect: 'heal',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('spells', null, {});
}