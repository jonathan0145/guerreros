import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import User from './user.js';

class PlayerStats extends Model {
  // Método para actualizar estadísticas después de una partida
  async updateAfterGame(gameResult) {
    const updates = {
      total_games: this.total_games + 1
    };

    // Actualizar victorias/derrotas/empates
    if (gameResult.isWinner) {
      updates.victories = this.victories + 1;
      updates.current_streak = this.current_streak + 1;
      updates.longest_streak = Math.max(this.longest_streak, this.current_streak + 1);
      
      // Actualizar victorias por modo de juego
      switch (gameResult.gameMode) {
        case 'power':
          updates.power_wins = this.power_wins + 1;
          break;
        case 'magic':
          updates.magic_wins = this.magic_wins + 1;
          break;
        case 'combined':
          updates.combined_wins = this.combined_wins + 1;
          break;
      }
    } else if (gameResult.isDraw) {
      updates.draws = this.draws + 1;
      updates.current_streak = 0;
    } else {
      updates.defeats = this.defeats + 1;
      updates.current_streak = 0;
    }

    // Actualizar puntos de ranking
    const pointsChange = this.calculatePointsChange(gameResult);
    updates.ranking_points = this.ranking_points + pointsChange;
    updates.highest_ranking = Math.max(this.highest_ranking, updates.ranking_points);

    // Actualizar estadísticas adicionales
    updates.total_damage_dealt = this.total_damage_dealt + gameResult.damageDealt;
    updates.total_damage_taken = this.total_damage_taken + gameResult.damageTaken;
    updates.total_warriors_defeated = this.total_warriors_defeated + gameResult.warriorsDefeated;
    updates.total_warriors_lost = this.total_warriors_lost + gameResult.warriorsLost;

    await this.update(updates);
    return updates;
  }

  // Método para calcular cambio de puntos basado en el resultado
  calculatePointsChange(gameResult) {
    const BASE_POINTS = 32;
    const DRAW_FACTOR = 0.5;
    
    // Factor de diferencia de ranking
    const rankingDiff = gameResult.opponentRanking - this.ranking_points;
    const expectedScore = 1 / (1 + Math.pow(10, rankingDiff / 400));
    
    let actualScore;
    if (gameResult.isWinner) actualScore = 1;
    else if (gameResult.isDraw) actualScore = 0.5;
    else actualScore = 0;

    return Math.round(BASE_POINTS * (actualScore - expectedScore));
  }

  // Método para obtener estadísticas resumidas
  getStats() {
    const winRate = this.total_games > 0 
      ? (this.victories / this.total_games * 100).toFixed(2) 
      : 0;

    return {
      total_games: this.total_games,
      victories: this.victories,
      defeats: this.defeats,
      draws: this.draws,
      win_rate: parseFloat(winRate),
      current_streak: this.current_streak,
      longest_streak: this.longest_streak,
      ranking_points: this.ranking_points,
      highest_ranking: this.highest_ranking,
      mode_stats: {
        power_wins: this.power_wins,
        magic_wins: this.magic_wins,
        combined_wins: this.combined_wins
      },
      combat_stats: {
        total_damage_dealt: this.total_damage_dealt,
        total_damage_taken: this.total_damage_taken,
        total_warriors_defeated: this.total_warriors_defeated,
        total_warriors_lost: this.total_warriors_lost,
        average_damage_per_game: this.total_games > 0 
          ? Math.round(this.total_damage_dealt / this.total_games) 
          : 0
      }
    };
  }
}

PlayerStats.init({
  stats_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'user_id'  // Changed from User_id
    }
  },
  total_games: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  victories: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  defeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  draws: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  power_wins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  magic_wins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  combined_wins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  ranking_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
  },
  highest_ranking: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
  },
  current_streak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  longest_streak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  total_damage_dealt: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  total_damage_taken: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  total_warriors_defeated: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  total_warriors_lost: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  favorite_mode: {
    type: DataTypes.ENUM('power', 'magic', 'combined'),
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'PlayerStats',
  tableName: 'player_stats',  // Changed from PLAYER_STATS
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id']
    },
    {
      fields: ['ranking_points']
    }
  ]
});

// Definir las relaciones
PlayerStats.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'User'
});

export default PlayerStats;