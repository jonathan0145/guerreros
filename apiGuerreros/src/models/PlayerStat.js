const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PlayerStat = sequelize.define('PlayerStat', {
    player_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { model: 'players', key: 'player_id' }
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

// *** ¡AÑADIR ESTE MÉTODO ASSOCIATE! ***
PlayerStat.associate = (models) => {
    // Relación PlayerStat - Player (1:1)
    // Las estadísticas del jugador pertenecen a un jugador.
    PlayerStat.belongsTo(models.Player, { foreignKey: 'player_id' });
};

module.exports = PlayerStat;