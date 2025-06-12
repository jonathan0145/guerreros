const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Race = sequelize.define('Race', {
    race_id: { 
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
  tableName: 'races',
  timestamps: false
});

module.exports = Race;