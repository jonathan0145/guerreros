const express = require('express');
const {
  getAllRankings,
  getRankingById,
  createRanking,
  updateRanking,
  deleteRanking
} = require('../controllers/rankingcontroller');
const { verifyRole } = require('../middleware/verifyRole.js');
const { verifyPlayerRole } = require('../middleware/verifyPlayerRole.js');

const router = express.Router();

// Public routes
router.get('/rankings', getAllRankings);
router.get('/ranking/:id', getRankingById);

// Routes for admin only
router.post('/ranking', verifyRole('admin'), createRanking);
router.put('/ranking/:id', verifyRole('admin'), updateRanking);
router.delete('/ranking/:id', verifyRole('admin'), deleteRanking);

module.exports = router;