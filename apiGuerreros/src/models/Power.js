// src/models/Power.js
'use strict';
const { Model } = require('sequelize'); // Importar Model

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class Power extends Model {
    static associate(models) {
      // Define la relación de muchos a muchos con Warrior
      Power.belongsToMany(models.Warrior, { through: models.WarriorPower, as: 'warriors', foreignKey: 'power_id' }); //
    }
  }
  Power.init({
    power_id: {
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
    },
    percentage: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'powers',
    modelName: 'Power', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return Power; // <-- Retorna la CLASE del modelo
};