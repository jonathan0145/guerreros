import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

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

// Función para limpiar la base de datos
async function cleanDatabase() {
  try {
    // Probar la conexión
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    const queryInterface = sequelize.getQueryInterface();

    // Limpiar las tablas en orden inverso para evitar problemas con las claves foráneas
    console.log('Limpiando WARRIOR_SPELLS...');
    await queryInterface.bulkDelete('WARRIOR_SPELLS', null, {});

    console.log('Limpiando WARRIOR_POWERS...');
    await queryInterface.bulkDelete('WARRIOR_POWERS', null, {});

    console.log('Limpiando WARRIOR...');
    await queryInterface.bulkDelete('WARRIOR', null, {});

    console.log('Limpiando USER...');
    await queryInterface.bulkDelete('USER', null, {});

    console.log('Limpiando SPELLS...');
    await queryInterface.bulkDelete('SPELLS', null, {});

    console.log('Limpiando POWERS...');
    await queryInterface.bulkDelete('POWERS', null, {});

    console.log('Limpiando WARRIOR_TYPE...');
    await queryInterface.bulkDelete('WARRIOR_TYPE', null, {});

    console.log('Limpiando RACE...');
    await queryInterface.bulkDelete('RACE', null, {});

    console.log('Limpiando USER_STATUS...');
    await queryInterface.bulkDelete('USER_STATUS', null, {});

    console.log('Base de datos limpiada correctamente');
  } catch (error) {
    console.error('Error al limpiar la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

cleanDatabase(); 