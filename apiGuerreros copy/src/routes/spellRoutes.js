const express = require('express');
const {
  getAllSpells,
  getSpellById,
  createSpell,
  updateSpell,
  deleteSpell
} = require('../controllers/spellController');
const { verifyRole } = require('../middleware/verifyRole.js');

const router = express.Router();

// Public routes
router.get('/spells', getAllSpells);
router.get('/spell/:id', getSpellById);

// Routes for admin only
router.post('/spell', verifyRole('admin', 'service'), createSpell);
router.put('/spell/:id', verifyRole('admin','service'), updateSpell);
router.delete('/spell/:id', verifyRole('admin'), deleteSpell);

module.exports = router;