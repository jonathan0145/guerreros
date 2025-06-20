// src/models/Ranking.js
'use strict';
const { Model } = require('sequelize'); // Importar Model

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class Ranking extends Model {
    static associate(models) {
      // Relación Ranking - Player (1:1)
      Ranking.belongsTo(models.Player, { foreignKey: 'player_id' }); //
    }
  }
  Ranking.init({
    player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'players', key: 'player_id' }
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'ranking',
    modelName: 'Ranking', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return Ranking; // <-- Retorna la CLASE del modelo
};