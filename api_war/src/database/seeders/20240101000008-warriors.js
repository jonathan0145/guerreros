export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('warriors', [
    {
      warrior_name: 'Aragorn',
      race_id: 1, // Human
      type_id: 1, // Knight
      user_id: 1,
      power: 150,
      magic: 80,
      health: 1200,
      level: 5,
      experience: 1500,
      victories: 10,
      defeats: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Legolas',
      race_id: 2, // Elf
      type_id: 3, // Archer
      user_id: 1,
      power: 130,
      magic: 100,
      health: 1000,
      level: 4,
      experience: 1200,
      victories: 8,
      defeats: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Gandalf',
      race_id: 1, // Human
      type_id: 2, // Mage
      user_id: 1,
      power: 90,
      magic: 200,
      health: 900,
      level: 6,
      experience: 2000,
      victories: 15,
      defeats: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Thrall',
      race_id: 3, // Orc
      type_id: 4, // Berserker
      user_id: 1,
      power: 180,
      magic: 60,
      health: 1300,
      level: 4,
      experience: 1300,
      victories: 7,
      defeats: 4,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Gimli',
      race_id: 4, // Dwarf
      type_id: 1, // Knight
      user_id: 1,
      power: 160,
      magic: 40,
      health: 1400,
      level: 3,
      experience: 900,
      victories: 5,
      defeats: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Merlin',
      race_id: 1, // Human
      type_id: 2, // Mage
      user_id: 1,
      power: 85,
      magic: 190,
      health: 950,
      level: 5,
      experience: 1600,
      victories: 12,
      defeats: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Sylvanas',
      race_id: 2, // Elf
      type_id: 3, // Archer
      user_id: 1,
      power: 140,
      magic: 120,
      health: 950,
      level: 5,
      experience: 1450,
      victories: 9,
      defeats: 4,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Grom',
      race_id: 3, // Orc
      type_id: 4, // Berserker
      user_id: 1,
      power: 190,
      magic: 40,
      health: 1250,
      level: 4,
      experience: 1100,
      victories: 6,
      defeats: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Thorin',
      race_id: 4, // Dwarf
      type_id: 1, // Knight
      user_id: 1,
      power: 155,
      magic: 45,
      health: 1350,
      level: 4,
      experience: 1250,
      victories: 8,
      defeats: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Medivh',
      race_id: 1, // Human
      type_id: 2, // Mage
      user_id: 1,
      power: 80,
      magic: 195,
      health: 900,
      level: 6,
      experience: 1900,
      victories: 14,
      defeats: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Alleria',
      race_id: 2, // Elf
      type_id: 3, // Archer
      user_id: 1,
      power: 135,
      magic: 110,
      health: 975,
      level: 4,
      experience: 1350,
      victories: 7,
      defeats: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Durotan',
      race_id: 3, // Orc
      type_id: 1, // Knight
      user_id: 1,
      power: 175,
      magic: 50,
      health: 1275,
      level: 4,
      experience: 1200,
      victories: 8,
      defeats: 4,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Balin',
      race_id: 4, // Dwarf
      type_id: 1, // Knight
      user_id: 1,
      power: 150,
      magic: 35,
      health: 1325,
      level: 3,
      experience: 850,
      victories: 4,
      defeats: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Khadgar',
      race_id: 1, // Human
      type_id: 2, // Mage
      user_id: 1,
      power: 95,
      magic: 185,
      health: 925,
      level: 5,
      experience: 1550,
      victories: 11,
      defeats: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Vereesa',
      race_id: 2, // Elf
      type_id: 3, // Archer
      user_id: 1,
      power: 125,
      magic: 115,
      health: 960,
      level: 4,
      experience: 1150,
      victories: 6,
      defeats: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Blackhand',
      race_id: 3, // Orc
      type_id: 4, // Berserker
      user_id: 1,
      power: 185,
      magic: 45,
      health: 1225,
      level: 4,
      experience: 1275,
      victories: 9,
      defeats: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Dwalin',
      race_id: 4, // Dwarf
      type_id: 1, // Knight
      user_id: 1,
      power: 165,
      magic: 30,
      health: 1375,
      level: 3,
      experience: 925,
      victories: 5,
      defeats: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Antonidas',
      race_id: 1, // Human
      type_id: 2, // Mage
      user_id: 1,
      power: 75,
      magic: 205,
      health: 875,
      level: 6,
      experience: 2100,
      victories: 16,
      defeats: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Orgrim',
      race_id: 3, // Orc
      type_id: 4, // Berserker
      user_id: 1,
      power: 195,
      magic: 35,
      health: 1290,
      level: 5,
      experience: 1650,
      victories: 13,
      defeats: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      warrior_name: 'Illidan',
      race_id: 2, // Elf
      type_id: 4, // Berserker
      user_id: 1,
      power: 170,
      magic: 170,
      health: 1100,
      level: 7,
      experience: 2500,
      victories: 20,
      defeats: 0,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('warriors', null, {});
}