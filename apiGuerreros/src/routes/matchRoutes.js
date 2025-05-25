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

const router = express.Router();

// Public routes
router.get('/matches', getAllMatches);
router.get('/match/:id', getMatchById);

// Routes for admin only
router.post('/match', verifyRole('admin'), createMatch);
router.put('/match/:id', verifyRole('admin'), updateMatch);
router.delete('/match/:id', verifyRole('admin'), deleteMatch);

// Routes for service role
router.post('/match/:matchId/player/:playerId', verifyRole('service'), addPlayerToMatch);
router.delete('/match/:matchId/player/:playerId', verifyRole('service'), removePlayerFromMatch);

// Routes for combined roles (admin and service)
router.post('/select-warriors', verifyRole('admin', 'service'), selectWarriorsForMatch);
router.post('/match/:matchId/play', verifyRole('admin', 'service'), playMatch);
router.put('/match/:matchId/finish', verifyRole('admin', 'service'), finishMatch);

module.exports = router;