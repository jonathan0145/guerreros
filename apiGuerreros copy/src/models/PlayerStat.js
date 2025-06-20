// src/models/PlayerStat.js
'use strict';
const { Model } = require('sequelize'); // Importar Model

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class PlayerStat extends Model {
    static associate(models) {
      // Relación PlayerStat - Player (1:1)
      PlayerStat.belongsTo(models.Player, { foreignKey: 'player_id' }); //
    }
  }
  PlayerStat.init({
    player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'players', key: 'player_id' }
    },
    games_played: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    victories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    defeats: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'player_stats',
    modelName: 'PlayerStat', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return PlayerStat; // <-- Retorna la CLASE del modelo
};