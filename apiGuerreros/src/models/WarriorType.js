const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const WarriorType = sequelize.define('WarriorType', {
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
  tableName: 'warrior_types',
  timestamps: false
});

module.exports = WarriorType;