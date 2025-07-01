const express = require('express');
const {
  getWarriorById,
  createWarrior,
  updateWarrior,
  deleteWarrior,
  getAllWarriors,
  addPowerToWarrior,
  removePowerFromWarrior,
  addSpellToWarrior,
  removeSpellFromWarrior,
  addWarriorToMatch,
  removeWarriorFromMatch,
  getWarriorDetails
} = require('../controllers/warriorController');
const { verifyRole } = require('../middleware/verifyRole.js');
const { verifyPlayerRole } = require('../middleware/verifyPlayerRole.js');

const router = express.Router();

// Public routes
router.get('/warriors', getAllWarriors);
router.get('/warrior/:id', getWarriorById);
router.get('/warriorpm/:id', getWarriorDetails);

// Routes for admin only
router.post('/warrior', verifyRole('admin'), createWarrior);
router.put('/warrior/:id', verifyRole('admin'), updateWarrior);
router.delete('/warrior/:id', verifyRole('admin'), deleteWarrior);

// Routes for admin and service roles
router.post('/warrior/:warriorId/power/:powerId', verifyRole('admin', 'service'), addPowerToWarrior);
router.delete('/warrior/:warriorId/power/:powerId', verifyRole('admin', 'service'), removePowerFromWarrior);
router.post('/warrior/:warriorId/spell/:spellId', verifyRole('admin', 'service'), addSpellToWarrior);
router.delete('/warrior/:warriorId/spell/:spellId', verifyRole('admin', 'service'), removeSpellFromWarrior);
router.post('/match/:matchId/warrior/:warriorId', verifyRole('admin', 'service'), addWarriorToMatch);
router.delete('/match/:matchId/warrior/:warriorId', verifyRole('admin', 'service'), removeWarriorFromMatch);

module.exports = router;