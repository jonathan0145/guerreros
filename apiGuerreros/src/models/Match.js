const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Match = sequelize.define('Match', {
    match_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    mode: { 
        type: DataTypes.STRING(20), 
        allowNull: false 
    },
    winner_id: { 
        type: DataTypes.INTEGER,
        references: { model: 'players', key: 'player_id' }
    },
    created_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    finished_at: { 
        type: DataTypes.DATE 
    }
}, {
  tableName: 'matches',
  timestamps: false
});

// *** ¡AÑADIR ESTE MÉTODO ASSOCIATE! ***
Match.associate = (models) => {
    // Relación Match - Player (N:M)
    Match.belongsToMany(models.Player, { through: models.MatchPlayer, foreignKey: 'match_id', otherKey: 'player_id' });

    // Relación Match - Warrior (N:M)
    Match.belongsToMany(models.Warrior, { through: models.MatchWarrior, foreignKey: 'match_id', otherKey: 'warrior_id' });

    // *** Relación Match - Player (Ganador del partido) - AÑADIDA ***
    // 'winner_id' apunta a 'player_id' en el modelo Player
    Match.belongsTo(models.Player, { as: 'Winner', foreignKey: 'winner_id' });
};

module.exports = Match;