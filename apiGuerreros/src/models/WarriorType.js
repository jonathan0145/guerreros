// src/models/WarriorType.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WarriorType extends Model {
    static associate(models) {
      WarriorType.hasMany(models.Warrior, { foreignKey: 'type_id' });
    }
  }
  WarriorType.init({
    type_id: {
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
    sequelize,
    tableName: 'warrior_types',
    modelName: 'WarriorType',
    timestamps: false
  });
  return WarriorType;
};