const express = require('express');
const {
  getAllRaces,
  getRaceById,
  createRace,
  updateRace,
  deleteRace
} = require('../controllers/raceController');
const { verifyRole } = require('../middleware/verifyRole.js');

const router = express.Router();

// Public routes
router.get('/races', getAllRaces);
router.get('/race/:id', getRaceById);

// Routes for admin only
router.post('/race', verifyRole('admin'), createRace);
router.put('/race/:id', verifyRole('admin'), updateRace);
router.delete('/race/:id', verifyRole('admin'), deleteRace);

module.exports = router;