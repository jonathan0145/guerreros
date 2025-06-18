
// src/models/Match.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class Match extends Model {
    static associate(models) {
      // Relación Match - Player (N:M)
      Match.belongsToMany(models.Player, { through: models.MatchPlayer, foreignKey: 'match_id', otherKey: 'player_id' });

      // Relación Match - Warrior (N:M)
      Match.belongsToMany(models.Warrior, {
          through: models.MatchWarrior,
          foreignKey: 'match_id',
          otherKey: 'warrior_id',
          as: 'warriorsInMatch'
      });

      // Relación Match - Player (Ganador del partido)
      Match.belongsTo(models.Player, { as: 'Winner', foreignKey: 'winner_id' });
    }
  }
  Match.init({
    match_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mode: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    winner_id: {
        type: DataTypes.INTEGER,
        references: { model: 'players', key: 'player_id' }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    finished_at: {
        type: DataTypes.DATE
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'matches',
    modelName: 'Match', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return Match; // <-- Retorna la CLASE del modelo
};