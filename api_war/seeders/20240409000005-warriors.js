export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WARRIORS', [
      {
        name: 'Guerrero de Fuego',
        level: 1,
        experience: 0,
        health: 100,
        mana: 50,
        strength: 15,
        dexterity: 12,
        intelligence: 8,
        defense: 10
      },
      {
        name: 'Guerrero de Hielo',
        level: 1,
        experience: 0,
        health: 90,
        mana: 60,
        strength: 12,
        dexterity: 10,
        intelligence: 12,
        defense: 8
      },
      {
        name: 'Guerrero de Tierra',
        level: 1,
        experience: 0,
        health: 120,
        mana: 40,
        strength: 18,
        dexterity: 8,
        intelligence: 6,
        defense: 15
      },
      {
        name: 'Guerrero de Viento',
        level: 1,
        experience: 0,
        health: 80,
        mana: 45,
        strength: 10,
        dexterity: 18,
        intelligence: 10,
        defense: 7
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WARRIORS', null, {});
  }
}; 