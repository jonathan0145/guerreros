const express = require('express');
const {
  getAllPlayerStats,
  getPlayerStatById,
  createPlayerStat, // Añadir esta función
  updatePlayerStat,
  deletePlayerStat // Añadir esta función
} = require('../controllers/playerStatController.js');

const router = express.Router();

// Ruta para obtener todas las estadísticas de jugadores
router.get('/player-stats', getAllPlayerStats);

// Ruta para obtener las estadísticas de un jugador por ID
router.get('/player-stat/:id', getPlayerStatById);

// Ruta para crear nuevas estadísticas de jugador
router.post('/player-stat', createPlayerStat); // Añadir esta ruta

// Ruta para actualizar las estadísticas de un jugador por ID
router.put('/player-stat/:id', updatePlayerStat);

// Ruta para eliminar las estadísticas de un jugador por ID
router.delete('/player-stat/:id', deletePlayerStat); // Añadir esta ruta

module.exports = router;