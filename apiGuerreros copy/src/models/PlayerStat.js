const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PlayerStat = sequelize.define('PlayerStat', {
    player_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true 
    },
    games_played: { 
        type: DataTypes.INTEGER,
        defaultValue: 0 
    },
    victories: {
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    defeats: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    }
}, {
  tableName: 'player_stats',
  timestamps: false
});

module.exports = PlayerStat;