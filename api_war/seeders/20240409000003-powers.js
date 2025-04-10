'use strict';

export default {
  async up(queryInterface, Sequelize) {
    // Primero limpiamos la tabla
    await queryInterface.bulkDelete('powers', null, {});

    // Luego insertamos los nuevos registros
    return queryInterface.bulkInsert('powers', [
      {
        name: 'Golpe de Fuerza',
        description: 'Un poderoso ataque que causa daño adicional',
        percentage: 150,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Escudo Defensivo',
        description: 'Aumenta la defensa temporalmente',
        percentage: 200,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ataque Rápido',
        description: 'Realiza múltiples ataques rápidos',
        percentage: 75,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Grito de Batalla',
        description: 'Aumenta el daño de todos los aliados',
        percentage: 125,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Golpe Letal',
        description: 'Un ataque con alta probabilidad de crítico',
        percentage: 175,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('powers', null, {});
  }
}; 