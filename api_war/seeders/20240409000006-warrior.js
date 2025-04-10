'use strict';

export default {
  async up(queryInterface, Sequelize) {
    // Obtener IDs de razas
    const [races] = await queryInterface.sequelize.query(
      `SELECT race_id, name FROM races`
    );
    const raceMap = {};
    races.forEach(race => {
      raceMap[race.name] = race.race_id;
    });

    // Obtener IDs de tipos de guerreros
    const [warriorTypes] = await queryInterface.sequelize.query(
      `SELECT type_id, name FROM warrior_types`
    );
    const typeMap = {};
    warriorTypes.forEach(type => {
      typeMap[type.name] = type.type_id;
    });

    // Obtener IDs de usuarios
    const [users] = await queryInterface.sequelize.query(
      `SELECT user_id, user_user FROM users`
    );
    const userMap = {};
    users.forEach(user => {
      userMap[user.user_user] = user.user_id;
    });

    // Crear guerreros
    const warriors = [
      {
        name: 'Aragorn',
        race_id: raceMap['Humano'],
        type_id: typeMap['Guerrero'],
        total_power: 120,
        total_magic: 80,
        health: 1200,
        speed: 100,
        intelligence: 90,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gandalf',
        race_id: raceMap['Humano'],
        type_id: typeMap['Mago'],
        total_power: 70,
        total_magic: 150,
        health: 900,
        speed: 80,
        intelligence: 120,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Legolas',
        race_id: raceMap['Elfo'],
        type_id: typeMap['Arquero'],
        total_power: 90,
        total_magic: 100,
        health: 1000,
        speed: 120,
        intelligence: 100,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gimli',
        race_id: raceMap['Enano'],
        type_id: typeMap['Guerrero'],
        total_power: 130,
        total_magic: 60,
        health: 1300,
        speed: 90,
        intelligence: 80,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('warriors', warriors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('warriors', null, {});
  }
}; 