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

    // Obtener IDs de hechizos
    const [spells] = await queryInterface.sequelize.query(
      `SELECT spell_id, name FROM spells`
    );
    const spellMap = {};
    spells.forEach(spell => {
      spellMap[spell.name] = spell.spell_id;
    });

    // Asignar hechizos a guerreros
    const warriorSpells = [
      {
        warrior_id: warriorMap['Gandalf'],
        spell_id: spellMap['Bola de Fuego'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Gandalf'],
        spell_id: spellMap['Rayo'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Gandalf'],
        spell_id: spellMap['Escudo Mágico'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Legolas'],
        spell_id: spellMap['Teletransporte'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        warrior_id: warriorMap['Aragorn'],
        spell_id: spellMap['Curación'],
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('warrior_spells', warriorSpells, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('warrior_spells', null, {});
  }
}; 