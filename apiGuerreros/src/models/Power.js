const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Power = sequelize.define('Power', {
    power_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, autoIncrement: true 
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
  tableName: 'powers',
  timestamps: false
});

module.exports = Power;