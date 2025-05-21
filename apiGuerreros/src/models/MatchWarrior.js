const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const MatchWarrior = sequelize.define('MatchWarrior', {
    match_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true 
    },
    warrior_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true 
    }
}, {
  tableName: 'match_warriors',
  timestamps: false
});

module.exports = MatchWarrior;