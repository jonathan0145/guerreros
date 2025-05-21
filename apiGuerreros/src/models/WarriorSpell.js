const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const WarriorSpell = sequelize.define('WarriorSpell', {
    warrior_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true 
    },
    spell_id: { 
        type: DataTypes.INTEGER, primaryKey: true 
    }
}, {
  tableName: 'warrior_spells',
  timestamps: false
});

module.exports = WarriorSpell;