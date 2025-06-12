const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const MatchPlayer = sequelize.define('MatchPlayer', {
    match_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    player_id: { 
        type: DataTypes.INTEGER 
    }
}, {
  tableName: 'match_players',
  timestamps: false
});

module.exports = MatchPlayer;