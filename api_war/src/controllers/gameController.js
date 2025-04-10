import Game from '../models/game.js';
import GamePlayer from '../models/game_player.js';
import GameWarrior from '../models/game_warrior.js';
import User from '../models/user.js';
import Warrior from '../models/warrior.js';
import PlayerStats from '../models/player_stats.js';
import { Op } from 'sequelize';

// Create a new game
export const createGame = async (req, res) => {
  try {
    const { gameMode, warriorId } = req.body;
    const userId = req.user.id;

    // Validate warrior ownership and availability
    const warrior = await Warrior.findOne({
      where: { warrior_id: warriorId, user_id: userId }
    });

    if (!warrior) {
      return res.status(404).json({
        error: {
          message: 'Warrior not found or does not belong to you',
          status: 404
        }
      });
    }

    if (!(await warrior.canJoinGame())) {
      return res.status(400).json({
        error: {
          message: 'Warrior is already in another game',
          status: 400
        }
      });
    }

    // Create game
    const game = await Game.create({
      game_mode: gameMode,
      status: 'waiting',
      created_by: userId,
      current_turn: 0,
      round: 1
    });

    // Add creator as first player with their warrior
    await GamePlayer.create({
      game_id: game.game_id,
      user_id: userId,
      ready: true
    });

    await GameWarrior.create({
      game_id: game.game_id,
      warrior_id: warriorId,
      user_id: userId,
      position: 1,
      max_health: warrior.health,
      current_health: warrior.health
    });

    res.status(201).json({
      message: 'Game created successfully',
      game: await game.getGameState()
    });
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({
      error: {
        message: 'Error creating game',
        status: 500
      }
    });
  }
};

// Join an existing game
export const joinGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { warriorId } = req.body;
    const userId = req.user.id;

    const game = await Game.findByPk(gameId);

    if (!game) {
      return res.status(404).json({
        error: {
          message: 'Game not found',
          status: 404
        }
      });
    }

    if (game.status !== 'waiting') {
      return res.status(400).json({
        error: {
          message: 'Game is not available to join',
          status: 400
        }
      });
    }

    // Validate warrior ownership and availability
    const warrior = await Warrior.findOne({
      where: { warrior_id: warriorId, user_id: userId }
    });

    if (!warrior) {
      return res.status(404).json({
        error: {
          message: 'Warrior not found or does not belong to you',
          status: 404
        }
      });
    }

    if (!(await warrior.canJoinGame())) {
      return res.status(400).json({
        error: {
          message: 'Warrior is already in another game',
          status: 400
        }
      });
    }

    // Add player and their warrior
    await GamePlayer.create({
      game_id: game.game_id,
      user_id: userId,
      ready: true
    });

    await GameWarrior.create({
      game_id: game.game_id,
      warrior_id: warriorId,
      user_id: userId,
      position: 2,
      max_health: warrior.health,
      current_health: warrior.health
    });

    // Update game status if we can start
    if (await game.canStart()) {
      await game.update({ 
        status: 'in_progress',
        started_at: new Date()
      });
    }

    res.json({
      message: 'Successfully joined the game',
      game: await game.getGameState()
    });
  } catch (error) {
    console.error('Join game error:', error);
    res.status(500).json({
      error: {
        message: 'Error joining game',
        status: 500
      }
    });
  }
};

// Get game information
export const getGameInfo = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findByPk(gameId);

    if (!game) {
      return res.status(404).json({
        error: {
          message: 'Game not found',
          status: 404
        }
      });
    }

    res.json(await game.getGameState());
  } catch (error) {
    console.error('Get game info error:', error);
    res.status(500).json({
      error: {
        message: 'Error fetching game information',
        status: 500
      }
    });
  }
};

// Process combat turn
export const processCombat = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { action, targetId } = req.body;
    const userId = req.user.id;

    const game = await Game.findByPk(gameId);

    if (!game) {
      return res.status(404).json({
        error: {
          message: 'Game not found',
          status: 404
        }
      });
    }

    if (game.status !== 'in_progress') {
      return res.status(400).json({
        error: {
          message: 'Game is not in progress',
          status: 400
        }
      });
    }

    // Verify it's the player's turn
    const currentPlayer = await GamePlayer.findOne({
      where: { game_id: gameId, user_id: userId }
    });

    if (!currentPlayer) {
      return res.status(403).json({
        error: {
          message: 'You are not part of this game',
          status: 403
        }
      });
    }

    // Get attacker and target warriors
    const attackerWarrior = await GameWarrior.findOne({
      where: { game_id: gameId, user_id: userId }
    });

    const targetWarrior = await GameWarrior.findOne({
      where: { game_id: gameId, warrior_id: targetId }
    });

    if (!attackerWarrior || !targetWarrior) {
      return res.status(404).json({
        error: {
          message: 'Warriors not found',
          status: 404
        }
      });
    }

    // Process the action
    let actionResult;
    switch (action) {
      case 'attack':
        const damage = await attackerWarrior.getAttackPower(game.game_mode);
        actionResult = await targetWarrior.takeDamage(damage);
        break;
      case 'heal':
        if (targetWarrior.user_id !== userId) {
          return res.status(400).json({
            error: {
              message: 'You can only heal your own warrior',
              status: 400
            }
          });
        }
        actionResult = await targetWarrior.heal(30); // Heal amount could be configurable
        break;
      default:
        return res.status(400).json({
          error: {
            message: 'Invalid action',
            status: 400
          }
        });
    }

    // Increment turn counter and check game end conditions
    await game.update({
      current_turn: game.current_turn + 1
    });

    // Check if game should end
    const gameState = await game.getGameState();
    if (gameState.shouldEnd) {
      const winner = await game.calculateWinner();
      await game.update({
        status: 'finished',
        winner_id: winner ? winner.user_id : null,
        finished_at: new Date()
      });

      // Update player stats
      const players = await GamePlayer.findAll({
        where: { game_id: gameId }
      });

      for (const player of players) {
        const stats = await PlayerStats.findOne({
          where: { user_id: player.user_id }
        });
        if (stats) {
          await stats.updateAfterGame({
            won: player.user_id === winner?.user_id,
            gameMode: game.game_mode,
            opponentRanking: gameState.players.find(p => p.user_id !== player.user_id)?.ranking
          });
        }
      }
    }

    res.json({
      message: 'Combat action processed',
      action: actionResult,
      game: await game.getGameState()
    });
  } catch (error) {
    console.error('Process combat error:', error);
    res.status(500).json({
      error: {
        message: 'Error processing combat action',
        status: 500
      }
    });
  }
};

// Get available games
export const getAvailableGames = async (req, res) => {
  try {
    const games = await Game.findAll({
      where: {
        status: 'waiting'
      },
      include: [{
        model: GamePlayer,
        include: [{
          model: User,
          attributes: ['username', 'id']
        }]
      }]
    });

    const formattedGames = await Promise.all(
      games.map(async game => ({
        ...game.toJSON(),
        state: await game.getGameState()
      }))
    );

    res.json(formattedGames);
  } catch (error) {
    console.error('Get available games error:', error);
    res.status(500).json({
      error: {
        message: 'Error fetching available games',
        status: 500
      }
    });
  }
};

// Forfeit game
export const forfeitGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const userId = req.user.id;

    const game = await Game.findByPk(gameId);

    if (!game) {
      return res.status(404).json({
        error: {
          message: 'Game not found',
          status: 404
        }
      });
    }

    if (game.status !== 'in_progress') {
      return res.status(400).json({
        error: {
          message: 'Game is not in progress',
          status: 400
        }
      });
    }

    const player = await GamePlayer.findOne({
      where: { game_id: gameId, user_id: userId }
    });

    if (!player) {
      return res.status(403).json({
        error: {
          message: 'You are not part of this game',
          status: 403
        }
      });
    }

    // Get the opponent
    const opponent = await GamePlayer.findOne({
      where: { 
        game_id: gameId,
        user_id: { [Op.ne]: userId }
      }
    });

    // Update game status
    await game.update({
      status: 'finished',
      winner_id: opponent.user_id,
      finished_at: new Date()
    });

    // Update player stats
    const gameState = await game.getGameState();
    for (const gamePlayer of [player, opponent]) {
      const stats = await PlayerStats.findOne({
        where: { user_id: gamePlayer.user_id }
      });
      if (stats) {
        await stats.updateAfterGame({
          won: gamePlayer.user_id === opponent.user_id,
          gameMode: game.game_mode,
          opponentRanking: gameState.players.find(p => p.user_id !== gamePlayer.user_id)?.ranking,
          forfeit: gamePlayer.user_id === userId
        });
      }
    }

    res.json({
      message: 'Game forfeited successfully',
      game: await game.getGameState()
    });
  } catch (error) {
    console.error('Forfeit game error:', error);
    res.status(500).json({
      error: {
        message: 'Error forfeiting game',
        status: 500
      }
    });
  }
}; 