// src/models/Spell.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spell extends Model {
    static associate(models) {
      Spell.belongsToMany(models.Warrior, { through: models.WarriorSpell, as: 'warriors', foreignKey: 'spell_id' });
    }
  }
  Spell.init({
    spell_id: {
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
    sequelize,
    tableName: 'spells',
    modelName: 'Spell',
    timestamps: false
  });
  return Spell;
};