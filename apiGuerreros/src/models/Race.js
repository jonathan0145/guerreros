// src/models/Race.js
'use strict';
const { Model } = require('sequelize'); // Importar Model

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class Race extends Model {
    static associate(models) {
      // Relación Race - Warrior (1:N)
      Race.hasMany(models.Warrior, { foreignKey: 'race_id' }); //
    }
  }
  Race.init({
    race_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'races',
    modelName: 'Race', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return Race; // <-- Retorna la CLASE del modelo
};