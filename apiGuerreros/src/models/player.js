const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Player = sequelize.define('Player', {
  player_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  tableName: 'players',
  timestamps: false
});

// *** ¡AÑADIR ESTE MÉTODO ASSOCIATE! ***
Player.associate = (models) => {
    // Relación Player - Warrior (1:N)
    Player.hasMany(models.Warrior, { foreignKey: 'player_id' });

    // Relación Player - Match (N:M)
    Player.belongsToMany(models.Match, { through: models.MatchPlayer, foreignKey: 'player_id', otherKey: 'match_id' });

    // Relación Player - PlayerStat (1:1)
    Player.hasOne(models.PlayerStat, { foreignKey: 'player_id' });

    // Relación Player - Ranking (1:1)
    Player.hasOne(models.Ranking, { foreignKey: 'player_id' });
};

module.exports = Player;