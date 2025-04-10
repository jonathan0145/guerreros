import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Configurar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar Sequelize
const sequelize = new Sequelize({
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'war_game_dev',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql'
});

// Función para ejecutar los seeders
async function runSeeders() {
  try {
    // Leer el directorio de seeders
    const seedersPath = join(dirname(__dirname), 'seeders');
    const files = await fs.readdir(seedersPath);
    
    // Ordenar los archivos por nombre para mantener el orden de ejecución
    const seederFiles = files.filter(file => file.endsWith('.js')).sort();
    
    // Ejecutar cada seeder
    for (const file of seederFiles) {
      console.log(`Ejecutando seeder: ${file}`);
      const seeder = require(join(seedersPath, file));
      await seeder.up({ queryInterface: sequelize.getQueryInterface(), Sequelize });
    }
    
    console.log('Todos los seeders se ejecutaron correctamente');
  } catch (error) {
    console.error('Error al ejecutar los seeders:', error);
  } finally {
    await sequelize.close();
  }
}

runSeeders(); 