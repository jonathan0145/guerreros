const { body, param, query } = require('express-validator');
const { Game, Warrior, GameWarrior } = require('../models');

const validateCreateGame = [
  body('game_mode').isIn(['power', 'magic', 'combined']),
  body('warrior_ids').isArray().withMessage('warrior_ids debe ser un array'),
  body('warrior_ids.*').isInt().withMessage('Cada ID de guerrero debe ser un número entero'),
  body('warrior_ids').custom(async (warriorIds, { req }) => {
    const warriors = await Warrior.findAll({
      where: {
        warrior_id: warriorIds,
        user_id: req.user.User_id
      }
    });
    if (warriors.length !== warriorIds.length) {
      throw new Error('Uno o más guerreros no pertenecen al usuario');
    }
    return true;
  })
];

const validateCombat = [
  body('game_id').isInt().withMessage('game_id debe ser un número entero'),
  body('attacker_warrior_id').isInt().withMessage('attacker_warrior_id debe ser un número entero'),
  body('defender_warrior_id').isInt().withMessage('defender_warrior_id debe ser un número entero'),
  body('game_id').custom(async (gameId, { req }) => {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }
    if (game.status !== 'in_progress') {
      throw new Error('La partida no está en progreso');
    }
    return true;
  }),
  body('attacker_warrior_id').custom(async (warriorId, { req }) => {
    const gameWarrior = await GameWarrior.findOne({
      where: {
        warrior_id: warriorId,
        user_id: req.user.User_id
      }
    });
    if (!gameWarrior) {
      throw new Error('El guerrero atacante no pertenece al usuario');
    }
    return true;
  })
];

const validateGameId = [
  param('game_id').isInt().withMessage('game_id debe ser un número entero'),
  param('game_id').custom(async (gameId, { req }) => {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }
    return true;
  })
];

const validateUserId = [
  param('user_id').isInt().withMessage('user_id debe ser un número entero')
];

const validatePagination = [
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit debe ser un número entre 1 y 100'),
  query('offset').optional().isInt({ min: 0 }).withMessage('offset debe ser un número mayor o igual a 0')
];

module.exports = {
  validateCreateGame,
  validateCombat,
  validateGameId,
  validateUserId,
  validatePagination
}; 