// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/database');

// const WarriorSpell = sequelize.define('WarriorSpell', {
//     warrior_id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true,
//         references: { model: 'warriors', key: 'warrior_id' }
//     },
//     spell_id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true,
//         references: { model: 'spells', key: 'spell_id' } 
//     }
// }, {
//   tableName: 'warrior_spells',
//   timestamps: false
// });

// // *** AÑADIR MÉTODO ASSOCIATE ***
// WarriorSpell.associate = (models) => {
//     WarriorSpell.belongsTo(models.Warrior, { foreignKey: 'warrior_id' });
//     WarriorSpell.belongsTo(models.Spell, { foreignKey: 'spell_id' });
// };

// module.exports = WarriorSpell;

// src/models/WarriorSpell.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WarriorSpell extends Model {
    static associate(models) {
      WarriorSpell.belongsTo(models.Warrior, { foreignKey: 'warrior_id' });
      WarriorSpell.belongsTo(models.Spell, { foreignKey: 'spell_id' });
    }
  }
  WarriorSpell.init({
    warrior_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'warriors', key: 'warrior_id' }
    },
    spell_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'spells', key: 'spell_id' }
    }
  }, {
    sequelize,
    tableName: 'warrior_spells',
    modelName: 'WarriorSpell',
    timestamps: false
  });
  return WarriorSpell;
};