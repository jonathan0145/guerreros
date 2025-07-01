const express = require('express');
const {
  getAllPowers,
  getPowerById,
  createPower,
  updatePower,
  deletePower
} = require('../controllers/powerController');
const { verifyRole } = require('../middleware/verifyRole.js');
const { verifyPlayerRole } = require('../middleware/verifyPlayerRole.js');

const router = express.Router();

// Public routes
router.get('/powers', getAllPowers);
router.get('/power/:id', getPowerById);

// Routes for admin only
router.post('/power', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), createPower);
router.put('/power/:id', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), updatePower);
router.delete('/power/:id', verifyRole('admin'), verifyPlayerRole('admin', 'user'), deletePower);

module.exports = router;