const express = require('express');
const {
  getAllPlayerStats,
  getPlayerStatById,
  createPlayerStat,
  updatePlayerStat,
  deletePlayerStat
} = require('../controllers/playerStatController.js');
const { verifyRole } = require('../middleware/verifyRole.js');
const { verifyPlayerRole } = require('../middleware/verifyPlayerRole.js');

const router = express.Router();

router.get('/player-stats', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), getAllPlayerStats);
router.get('/player-stat/:id', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), getPlayerStatById);
router.post('/player-stat', verifyRole('admin'), verifyPlayerRole('admin'), createPlayerStat);
router.put('/player-stat/:id', verifyRole('admin'), verifyPlayerRole('admin'), updatePlayerStat);
router.delete('/player-stat/:id', verifyRole('admin'), verifyPlayerRole('admin'), deletePlayerStat);

module.exports = router;