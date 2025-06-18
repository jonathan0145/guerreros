// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/database');

// const WarriorPower = sequelize.define('WarriorPower', {
//     warrior_id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true,
//         references: { model: 'warriors', key: 'warrior_id' }
//     },
//     power_id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true,
//         references: { model: 'powers', key: 'power_id' }
//     }
// }, {
//   tableName: 'warrior_powers',
//   timestamps: false
// });

// // *** AÑADIR MÉTODO ASSOCIATE ***
// // Define las relaciones de la tabla intermedia con los modelos principales
// WarriorPower.associate = (models) => {
//     WarriorPower.belongsTo(models.Warrior, { foreignKey: 'warrior_id' });
//     WarriorPower.belongsTo(models.Power, { foreignKey: 'power_id' });
// };

// module.exports = WarriorPower;

// src/models/WarriorPower.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WarriorPower extends Model {
    static associate(models) {
      WarriorPower.belongsTo(models.Warrior, { foreignKey: 'warrior_id' });
      WarriorPower.belongsTo(models.Power, { foreignKey: 'power_id' });
    }
  }
  WarriorPower.init({
    warrior_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'warriors', key: 'warrior_id' }
    },
    power_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'powers', key: 'power_id' }
    }
  }, {
    sequelize,
    tableName: 'warrior_powers',
    modelName: 'WarriorPower',
    timestamps: false
  });
  return WarriorPower;
};