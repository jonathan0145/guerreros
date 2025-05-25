const express = require('express');
const {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
  addPlayerToMatch,
  removePlayerFromMatch,
  selectWarriorsForMatch,
  playMatch,
  finishMatch,
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

// Ruta para seleccionar personajes para una partida
router.post('/select-warriors', selectWarriorsForMatch);

// Ruta para jugar una partida y determinar el ganador
router.post('/match/:matchId/play', playMatch);

// Ruta para finalizar una partida y registrar el resultado
router.put('/match/:matchId/finish', finishMatch);

module.exports = router;