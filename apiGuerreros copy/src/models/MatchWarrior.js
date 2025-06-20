
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