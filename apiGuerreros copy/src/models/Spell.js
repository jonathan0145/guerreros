const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Spell = sequelize.define('Spell', {
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
  tableName: 'spells',
  timestamps: false
});

module.exports = Spell;