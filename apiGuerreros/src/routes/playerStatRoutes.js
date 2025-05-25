const express = require('express');
const {
  getAllPlayerStats,
  getPlayerStatById,
  createPlayerStat,
  updatePlayerStat,
  deletePlayerStat
} = require('../controllers/playerStatController.js');
const { verifyRole } = require('../middleware/verifyRole.js');

const router = express.Router();

// Routes for admin only
router.get('/player-stats', verifyRole('admin'), getAllPlayerStats);
router.get('/player-stat/:id', verifyRole('admin'), getPlayerStatById);
router.post('/player-stat', verifyRole('admin'), createPlayerStat);
router.put('/player-stat/:id', verifyRole('admin'), updatePlayerStat);
router.delete('/player-stat/:id', verifyRole('admin'), deletePlayerStat);

module.exports = router;