import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { 
  createGame,
  joinGame,
  getGameInfo,
  processCombat,
  getAvailableGames,
  forfeitGame
} from '../controllers/gameController.js';
import { body } from 'express-validator';

const router = express.Router();

// Validation middleware
const createGameValidation = [
  body('gameMode')
    .isIn(['power', 'magic', 'combined'])
    .withMessage('Invalid game mode. Must be power, magic, or combined'),
  body('warriorId')
    .isInt()
    .withMessage('Warrior ID must be an integer')
];

const joinGameValidation = [
  body('warriorId')
    .isInt()
    .withMessage('Warrior ID must be an integer')
];

const combatValidation = [
  body('action')
    .isIn(['attack', 'heal'])
    .withMessage('Invalid action. Must be attack or heal'),
  body('targetId')
    .isInt()
    .withMessage('Target warrior ID must be an integer')
];

// Public routes
router.get('/available', authenticateToken, getAvailableGames);

// Protected routes
router.post('/create', authenticateToken, createGameValidation, createGame);
router.post('/:gameId/join', authenticateToken, joinGameValidation, joinGame);
router.get('/:gameId', authenticateToken, getGameInfo);
router.post('/:gameId/action', authenticateToken, combatValidation, processCombat);
router.post('/:gameId/forfeit', authenticateToken, forfeitGame);

export default router; 