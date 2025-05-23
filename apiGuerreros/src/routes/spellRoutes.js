const express = require('express');
const {
  getAllSpells,
  getSpellById,
  createSpell,
  updateSpell,
  deleteSpell
} = require('../controllers/spellController');

const router = express.Router();

// Route to get all spells
router.get('/spells', getAllSpells);

// Route to get a spell by ID
router.get('/spell/:id', getSpellById);

// Route to create a new spell
router.post('/spell', createSpell);

// Route to update a spell by ID
router.put('/spell/:id', updateSpell);

// Route to delete a spell by ID
router.delete('/spell/:id', deleteSpell);

module.exports = router;