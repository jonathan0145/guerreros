const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Ranking = sequelize.define('Ranking', {
    player_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { model: 'players', key: 'player_id' } 
    },
    score: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    }
}, {
  tableName: 'ranking',
  timestamps: false
});

// *** ¡AÑADIR ESTE MÉTODO ASSOCIATE! ***
Ranking.associate = (models) => {
    // Relación Ranking - Player (1:1)
    // El ranking pertenece a un jugador.
    Ranking.belongsTo(models.Player, { foreignKey: 'player_id' });
};

module.exports = Ranking;