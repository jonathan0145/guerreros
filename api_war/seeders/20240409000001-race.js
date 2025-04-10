'use strict';

export default {
  async up(queryInterface, Sequelize) {
    // Primero limpiamos la tabla
    await queryInterface.bulkDelete('races', null, {});

    // Luego insertamos los nuevos registros
    return queryInterface.bulkInsert('races', [
      {
        name: 'Humano',
        description: 'Raza versátil y adaptable',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Elfo',
        description: 'Raza ágil y mágica',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Enano',
        description: 'Raza resistente y fuerte',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Orco',
        description: 'Raza poderosa y guerrera',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Troll',
        description: 'Raza regenerativa y resistente',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('races', null, {});
  }
}; 