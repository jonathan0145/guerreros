import PlayerStats from '../models/player_stats.js';
import User from '../models/user.js';
import Game from '../models/game.js';
import { Op } from 'sequelize';

// Actualizar estadísticas después de una partida
export async function updateStats(game_id, winner_id, loser_id, game_mode) {
  try {
    // Actualizar estadísticas del ganador
    const winnerStats = await PlayerStats.findOne({ where: { user_id: winner_id } });
    if (winnerStats) {
      await winnerStats.update({
        total_games: winnerStats.total_games + 1,
        victories: winnerStats.victories + 1,
        current_streak: winnerStats.current_streak + 1,
        longest_streak: Math.max(winnerStats.longest_streak, winnerStats.current_streak + 1),
        ranking_points: winnerStats.ranking_points + 25,
        highest_ranking: Math.max(winnerStats.highest_ranking, winnerStats.ranking_points + 25),
        [`${game_mode}_wins`]: winnerStats[`${game_mode}_wins`] + 1
      });
    } else {
      await PlayerStats.create({
        user_id: winner_id,
        total_games: 1,
        victories: 1,
        current_streak: 1,
        longest_streak: 1,
        ranking_points: 1025,
        highest_ranking: 1025,
        [`${game_mode}_wins`]: 1
      });
    }

    // Actualizar estadísticas del perdedor
    const loserStats = await PlayerStats.findOne({ where: { user_id: loser_id } });
    if (loserStats) {
      await loserStats.update({
        total_games: loserStats.total_games + 1,
        defeats: loserStats.defeats + 1,
        current_streak: 0,
        ranking_points: Math.max(0, loserStats.ranking_points - 15)
      });
    } else {
      await PlayerStats.create({
        user_id: loser_id,
        total_games: 1,
        defeats: 1,
        ranking_points: 985
      });
    }
  } catch (error) {
    console.error('Error al actualizar estadísticas:', error);
  }
}

// Obtener ranking de jugadores
export const getRanking = async (req, res) => {
  try {
    const ranking = await User.findAll({
      attributes: [
        'user_id',
        'username',
        // Add more statistics as needed
      ],
      order: [
        ['username', 'ASC']
      ]
    });

    res.json(ranking);
  } catch (error) {
    console.error('Get ranking error:', error);
    res.status(500).json({
      error: {
        message: 'Error fetching ranking',
        status: 500
      }
    });
  }
};

// Obtener estadísticas de un jugador
export const getPlayerStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404
        }
      });
    }

    // Get player statistics logic here
    // This is a placeholder - you'll need to implement the actual statistics calculation

    res.json({
      userId,
      stats: {
        gamesPlayed: 0,
        wins: 0,
        losses: 0
      }
    });
  } catch (error) {
    console.error('Get player stats error:', error);
    res.status(500).json({
      error: {
        message: 'Error fetching player statistics',
        status: 500
      }
    });
  }
};

// Obtener historial de partidas de un jugador
export const getPlayerHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404
        }
      });
    }

    // Get player history logic here
    // This is a placeholder - you'll need to implement the actual history query

    res.json({
      userId,
      history: []
    });
  } catch (error) {
    console.error('Get player history error:', error);
    res.status(500).json({
      error: {
        message: 'Error fetching player history',
        status: 500
      }
    });
  }
};

// Obtener estadísticas globales
export const getGlobalStats = async (req, res) => {
  try {
    // Get global statistics logic here
    // This is a placeholder - you'll need to implement the actual statistics calculation

    res.json({
      totalGames: 0,
      activePlayers: 0,
      averageGameDuration: 0
    });
  } catch (error) {
    console.error('Get global stats error:', error);
    res.status(500).json({
      error: {
        message: 'Error fetching global statistics',
        status: 500
      }
    });
  }
}; 