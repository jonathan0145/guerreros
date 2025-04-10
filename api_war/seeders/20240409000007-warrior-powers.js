'use strict';

export default {
  async up(queryInterface, Sequelize) {
    // Obtener IDs de guerreros
    const [warriors] = await queryInterface.sequelize.query(
      `SELECT warrior_id, name FROM warriors`
    );
    const warriorMap = {};
    warriors.forEach(warrior => {
      warriorMap[warrior.name] = warrior.warrior_id;
    });

    // Obtener IDs de poderes
    const [powers] = await queryInterface.sequelize.query(
      `SELECT power_id, name FROM powers`
    );
    const powerMap = {};
    powers.forEach(power => {
      powerMap[power.name] = power.power_id;
    });

    // Asignar poderes a guerreros
    const warriorPowers = [
      {
        warrior_id: warriorMap['Aragorn'],
        power_id: powerMap['Golpe de Fuerza'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Aragorn'],
        power_id: powerMap['Ataque Rápido'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Gandalf'],
        power_id: powerMap['Escudo Defensivo'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Legolas'],
        power_id: powerMap['Ataque Rápido'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Gimli'],
        power_id: powerMap['Golpe de Fuerza'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Gimli'],
        power_id: powerMap['Grito de Batalla'],
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('warrior_powers', warriorPowers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('warrior_powers', null, {});
  }
}; 