// src/models/index.js (¡REEMPLAZA TU CONTENIDO ACTUAL CON ESTO!)

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); // index.js
const env = process.env.NODE_ENV || 'development';
// Asegúrate de que esta ruta a tu config.json sea correcta
const config = require(__dirname + '/../config/config.json')[env];
const db = {}; // Este objeto contendrá todos tus modelos cargados

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// *** PASO 1: CARGAR TODOS LOS MODELOS ***
// Lee todos los archivos .js en esta carpeta (que son tus modelos)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignorar archivos ocultos
      file !== basename &&      // Ignorar este mismo archivo (index.js)
      file.slice(-3) === '.js' && // Solo archivos JavaScript
      file.indexOf('.test.js') === -1 // Ignorar archivos de prueba si los tienes
    );
  })
  .forEach(file => {
    // Para cada archivo de modelo, lo requiere y lo define con Sequelize
    // El archivo de modelo debe exportar una función que recibe (sequelize, DataTypes)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Almacena el modelo en el objeto 'db' usando su nombre (ej. db.Warrior, db.Player)
  });

// *** PASO 2: INICIALIZAR LAS ASOCIACIONES (¡ESTO ES LO QUE TE FALTABA!) ***
// Itera sobre todos los modelos que acabamos de cargar en 'db'.
// Si un modelo tiene un método 'associate' definido, lo llama.
// Le pasamos el objeto 'db' completo para que 'associate' pueda acceder a todos los modelos (ej. models.Power).
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // ¡Aquí es donde Sequelize inyecta los métodos mágicos!
  }
});

// Añadir las instancias de sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; // Exporta todos los modelos y la instancia de Sequelize