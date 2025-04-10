export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('POWERS', [
      {
        name: 'Golpe de Fuerza',
        description: 'Un poderoso golpe que causa daño masivo',
        damage: 50,
        mana_cost: 30
      },
      {
        name: 'Escudo Defensivo',
        description: 'Crea un escudo mágico que absorbe daño',
        damage: 0,
        mana_cost: 25
      },
      {
        name: 'Ataque Rápido',
        description: 'Una serie de golpes veloces',
        damage: 35,
        mana_cost: 20
      },
      {
        name: 'Grito de Batalla',
        description: 'Un grito que aumenta el daño del equipo',
        damage: 0,
        mana_cost: 40
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('POWERS', null, {});
  }
}; 