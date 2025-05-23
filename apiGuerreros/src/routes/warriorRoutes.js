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
  removeWarriorFromMatch
} = require('../controllers/warriorController');

const router = express.Router();

// Ruta para obtener todos los guerreros
router.get('/warriors', getAllWarriors);

// Ruta para obtener un guerrero por ID
router.get('/warrior/:id', getWarriorById);

// Ruta para crear un nuevo guerrero
router.post('/warrior', createWarrior);

// Ruta para actualizar un guerrero por ID
router.put('/warrior/:id', updateWarrior);

// Ruta para eliminar un guerrero por ID
router.delete('/warrior/:id', deleteWarrior);

// Ruta para asociar un poder a un guerrero
router.post('/warrior/:warriorId/power/:powerId', addPowerToWarrior);

// Ruta para eliminar un poder de un guerrero
router.delete('/warrior/:warriorId/power/:powerId', removePowerFromWarrior);

// Ruta para asociar un hechizo a un guerrero
router.post('/warrior/:warriorId/spell/:spellId', addSpellToWarrior);

// Ruta para eliminar un hechizo de un guerrero
router.delete('/warrior/:warriorId/spell/:spellId', removeSpellFromWarrior);

// Ruta para asociar un guerrero a un partido
router.post('/match/:matchId/warrior/:warriorId', addWarriorToMatch);

// Ruta para eliminar un guerrero de un partido
router.delete('/match/:matchId/warrior/:warriorId', removeWarriorFromMatch);

module.exports = router;