const express = require('express');
const {
  getAllPowers,
  getPowerById,
  createPower,
  updatePower,
  deletePower
} = require('../controllers/powerController');
const { verifyRole } = require('../middleware/verifyRole.js');

const router = express.Router();

// Public routes
router.get('/powers', getAllPowers);
router.get('/power/:id', getPowerById);

// Routes for admin only
router.post('/power', verifyRole('admin'), createPower);
router.put('/power/:id', verifyRole('admin'), updatePower);
router.delete('/power/:id', verifyRole('admin'), deletePower);

module.exports = router;