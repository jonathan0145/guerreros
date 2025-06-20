// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/database');

// const MatchPlayer = sequelize.define('MatchPlayer', {
//     match_id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true, 
//          references: { model: 'matches', key: 'match_id' }
//     },
//     player_id: { 
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         references: { model: 'players', key: 'player_id' }
//     }
// }, {
//   tableName: 'match_players',
//   timestamps: false
// });

// // *** ¡AÑADIR ESTE MÉTODO ASSOCIATE! ***
// MatchPlayer.associate = (models) => {
//     MatchPlayer.belongsTo(models.Match, { foreignKey: 'match_id' });
//     MatchPlayer.belongsTo(models.Player, { foreignKey: 'player_id' });
// };

// module.exports = MatchPlayer;

// src/models/MatchPlayer.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class MatchPlayer extends Model {
    static associate(models) {
      MatchPlayer.belongsTo(models.Match, { foreignKey: 'match_id' });
      MatchPlayer.belongsTo(models.Player, { foreignKey: 'player_id' });
    }
  }
  MatchPlayer.init({
    match_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
         references: { model: 'matches', key: 'match_id' }
    },
    player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'players', key: 'player_id' }
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'match_players',
    modelName: 'MatchPlayer', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return MatchPlayer; // <-- Retorna la CLASE del modelo
};