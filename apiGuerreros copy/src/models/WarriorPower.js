const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const WarriorPower = sequelize.define('WarriorPower', {
    warrior_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true 
    },
    power_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true 
    }
}, {
  tableName: 'warrior_powers',
  timestamps: false
});

module.exports = WarriorPower;