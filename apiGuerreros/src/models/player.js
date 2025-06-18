// src/models/Player.js
'use strict';
const { Model } = require('sequelize'); // Importar Model

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class Player extends Model {
    static associate(models) {
      // Relación Player - Warrior (1:N)
      Player.hasMany(models.Warrior, { foreignKey: 'player_id' }); //

      // Relación Player - Match (N:M)
      Player.belongsToMany(models.Match, { through: models.MatchPlayer, foreignKey: 'player_id', otherKey: 'match_id' }); //

      // Relación Player - PlayerStat (1:1)
      Player.hasOne(models.PlayerStat, { foreignKey: 'player_id' }); //

      // Relación Player - Ranking (1:1)
      Player.hasOne(models.Ranking, { foreignKey: 'player_id' }); //
    }
  }
  Player.init({
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'players',
    modelName: 'Player', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return Player; // <-- Retorna la CLASE del modelo
};