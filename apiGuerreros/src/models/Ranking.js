const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Ranking = sequelize.define('Ranking', {
    player_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true 
    },
    score: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    }
}, {
  tableName: 'ranking',
  timestamps: false
});

module.exports = Ranking;