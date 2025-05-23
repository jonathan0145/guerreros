const express = require('express');
const {
  getAllRaces,
  getRaceById,
  createRace,
  updateRace,
  deleteRace
} = require('../controllers/raceController');

const router = express.Router();

// Ruta para obtener todas las razas
router.get('/races', getAllRaces);

// Ruta para obtener una raza por ID
router.get('/race/:id', getRaceById);

// Ruta para crear una nueva raza
router.post('/race', createRace);

// Ruta para actualizar una raza por ID
router.put('/race/:id', updateRace);

// Ruta para eliminar una raza por ID
router.delete('/race/:id', deleteRace);

module.exports = router;