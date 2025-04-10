'use strict';

export default {
  async up(queryInterface, Sequelize) {
    // Primero limpiamos la tabla
    await queryInterface.bulkDelete('warrior_types', null, {});

    // Luego insertamos los nuevos registros
    return queryInterface.bulkInsert('warrior_types', [
      {
        name: 'Guerrero',
        description: 'Especialista en combate cuerpo a cuerpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mago',
        description: 'Maestro de las artes arcanas',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Arquero',
        description: 'Experto en combate a distancia',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Asesino',
        description: 'Especialista en ataques sigilosos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Paladín',
        description: 'Guerrero sagrado con habilidades curativas',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('warrior_types', null, {});
  }
}; 