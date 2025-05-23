const express = require('express');
const {
  getAllRankings,
  getRankingById,
  createRanking,
  updateRanking,
  deleteRanking
} = require('../controllers/rankingcontroller');

const router = express.Router();

// Route to get all rankings
router.get('/rankings', getAllRankings);

// Route to get a ranking by ID
router.get('/ranking/:id', getRankingById);

// Route to create a new ranking
router.post('/ranking', createRanking);

// Route to update a ranking by ID
router.put('/ranking/:id', updateRanking);

// Route to delete a ranking by ID
router.delete('/ranking/:id', deleteRanking);

module.exports = router;