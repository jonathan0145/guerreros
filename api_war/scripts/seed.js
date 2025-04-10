import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import userStatusSeeder from '../seeders/20240409000000-user-status.js';
import raceSeeder from '../seeders/20240409000001-race.js';
import warriorTypeSeeder from '../seeders/20240409000002-warrior-type.js';
import powersSeeder from '../seeders/20240409000003-powers.js';
import spellsSeeder from '../seeders/20240409000004-spells.js';
import userSeeder from '../seeders/20240409000005-user.js';
import warriorSeeder from '../seeders/20240409000006-warrior.js';
import warriorPowersSeeder from '../seeders/20240409000007-warrior-powers.js';
import warriorSpellsSeeder from '../seeders/20240409000008-warrior-spells.js';

// Configurar variables de entorno
dotenv.config();

// Configurar Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'war_game_dev',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log
  }
);

// Función para ejecutar los seeders
async function runSeeders() {
  try {
    // Probar la conexión
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    const queryInterface = sequelize.getQueryInterface();

    // Ejecutar seeders en orden
    console.log('Ejecutando user-status seeder...');
    await userStatusSeeder.up(queryInterface, Sequelize);

    console.log('Ejecutando race seeder...');
    await raceSeeder.up(queryInterface, Sequelize);

    console.log('Ejecutando warrior-type seeder...');
    await warriorTypeSeeder.up(queryInterface, Sequelize);

    console.log('Ejecutando powers seeder...');
    await powersSeeder.up(queryInterface, Sequelize);

    console.log('Ejecutando spells seeder...');
    await spellsSeeder.up(queryInterface, Sequelize);

    console.log('Ejecutando user seeder...');
    await userSeeder.up(queryInterface, Sequelize);

    console.log('Ejecutando warrior seeder...');
    await warriorSeeder.up(queryInterface, Sequelize);

    console.log('Ejecutando warrior-powers seeder...');
    await warriorPowersSeeder.up(queryInterface, Sequelize);

    console.log('Ejecutando warrior-spells seeder...');
    await warriorSpellsSeeder.up(queryInterface, Sequelize);

    console.log('Todos los seeders se ejecutaron correctamente');
  } catch (error) {
    console.error('Error al ejecutar los seeders:', error);
  } finally {
    await sequelize.close();
  }
}

runSeeders(); 