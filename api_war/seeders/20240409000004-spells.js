'use strict';

export default {
  async up(queryInterface, Sequelize) {
    // Primero limpiamos la tabla
    await queryInterface.bulkDelete('spells', null, {});

    // Luego insertamos los nuevos registros
    return queryInterface.bulkInsert('spells', [
      {
        name: 'Bola de Fuego',
        description: 'Lanza una poderosa bola de fuego al objetivo',
        percentage: 180,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Rayo',
        description: 'Dispara un rayo que causa daño instantáneo',
        percentage: 150,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Curación',
        description: 'Restaura la salud del objetivo',
        percentage: 120,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Escudo Mágico',
        description: 'Crea una barrera mágica que absorbe daño',
        percentage: 200,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Teletransporte',
        description: 'Te permite moverte rápidamente a una ubicación cercana',
        percentage: 100,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('spells', null, {});
  }
}; 