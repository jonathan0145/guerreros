// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/database');

// const MatchWarrior = sequelize.define('MatchWarrior', {
//     match_id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true,
//         references: { 
//             model: 'matches', // Nombre de la tabla a la que hace referencia
//             key: 'match_id'   // Columna de la tabla a la que hace referencia
//         }
//     },
//     warrior_id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true,
//         references: {
//             model: 'warriors', // Nombre de la tabla a la que hace referencia
//             key: 'warrior_id'  // Columna de la tabla a la que hace referencia
//         }
//     }
// }, {
//   tableName: 'match_warriors',
//   timestamps: false
// });

// // También es buena práctica añadir el método associate para estas tablas intermedias,
// // aunque las relaciones many-to-many se definan en los modelos principales.
// // Esto permite hacer includes directos sobre MatchWarrior.
// MatchWarrior.associate = (models) => {
//     MatchWarrior.belongsTo(models.Match, { foreignKey: 'match_id' });
//     MatchWarrior.belongsTo(models.Warrior, { foreignKey: 'warrior_id' });
// };

// module.exports = MatchWarrior;

// src/models/MatchWarrior.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class MatchWarrior extends Model {
    static associate(models) {
      MatchWarrior.belongsTo(models.Match, { foreignKey: 'match_id' });
      MatchWarrior.belongsTo(models.Warrior, { foreignKey: 'warrior_id' });
    }
  }
  MatchWarrior.init({
    match_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'matches',
            key: 'match_id'
        }
    },
    warrior_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'warriors',
            key: 'warrior_id'
        }
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'match_warriors',
    modelName: 'MatchWarrior', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return MatchWarrior; // <-- Retorna la CLASE del modelo
};