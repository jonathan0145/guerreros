const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const MatchPlayer = sequelize.define('MatchPlayer', {
    match_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
         references: { model: 'matches', key: 'match_id' }
    },
    player_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'players', key: 'player_id' }
    }
}, {
  tableName: 'match_players',
  timestamps: false
});

// *** ¡AÑADIR ESTE MÉTODO ASSOCIATE! ***
MatchPlayer.associate = (models) => {
    MatchPlayer.belongsTo(models.Match, { foreignKey: 'match_id' });
    MatchPlayer.belongsTo(models.Player, { foreignKey: 'player_id' });
};

module.exports = MatchPlayer;