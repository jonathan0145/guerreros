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
const { verifyRole } = require('../middleware/verifyRole.js');
const { verifyPlayerRole } = require('../middleware/verifyPlayerRole.js');


const router = express.Router();

// Public routes
router.get('/matches', getAllMatches);
router.get('/match/:id', getMatchById);

// Routes for admin only
router.post('/match', verifyRole('admin'), verifyPlayerRole('admin'), createMatch);
router.put('/match/:id', verifyRole('admin'), verifyPlayerRole('admin'), updateMatch);
router.delete('/match/:id', verifyRole('admin'), verifyPlayerRole('admin'), deleteMatch);

// Routes for service role
router.post('/match/:matchId/player/:playerId', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), addPlayerToMatch);
router.delete('/match/:matchId/player/:playerId', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), removePlayerFromMatch);
router.post('/select-warriors', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), selectWarriorsForMatch);
router.post('/match/:matchId/play', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), playMatch);
router.put('/match/:matchId/finish', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), finishMatch);

module.exports = router;