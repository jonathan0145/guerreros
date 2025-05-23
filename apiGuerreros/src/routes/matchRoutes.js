const express = require('express');
const {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
  addPlayerToMatch,
  removePlayerFromMatch
} = require('../controllers/matchController');

const router = express.Router();

// Ruta para obtener todos los partidos
router.get('/matches', getAllMatches);

// Ruta para obtener un partido por ID
router.get('/match/:id', getMatchById);

// Ruta para crear un nuevo partido
router.post('/match', createMatch);

// Ruta para actualizar un partido por ID
router.put('/match/:id', updateMatch);

// Ruta para eliminar un partido por ID
router.delete('/match/:id', deleteMatch);

// Ruta para asociar un jugador a un partido
router.post('/match/:matchId/player/:playerId', addPlayerToMatch);

// Ruta para eliminar un jugador de un partido
router.delete('/match/:matchId/player/:playerId', removePlayerFromMatch);

module.exports = router;