// src/models/ApiUser.js
'use strict';
const { Model } = require('sequelize'); // Necesario para extender Model

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
  class ApiUser extends Model {
    /**
        * Método auxiliar para definir asociaciones.
        * Este método no forma parte del ciclo de vida de Sequelize.
        * El archivo `models/index` llamará a este método automáticamente.
    */
    static associate(models) {
      // Defina aquí las asociaciones si las hay
    }
  }
  ApiUser.init({
    api_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false, unique: true
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'service', 'read_only'),
        defaultValue: 'read_only'
    },
    api_token: {
        type: DataTypes.STRING(255),
        unique: true
    }
  }, {
    sequelize, // Pasa la instancia de sequelize
    tableName: 'api_users',
    modelName: 'ApiUser', // Asegúrate de que el modelName sea consistente
    timestamps: false
  });
  return ApiUser;
};