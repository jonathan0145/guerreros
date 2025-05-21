const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Match = sequelize.define('Match', {
    match_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    mode: { 
        type: DataTypes.STRING(20), 
        allowNull: false 
    },
    winner_id: { 
        type: DataTypes.INTEGER 
    },
    created_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW },
    finished_at: { 
        type: DataTypes.DATE 
    }
}, {
  tableName: 'matches',
  timestamps: false
});

module.exports = Match;