const express = require('express');
const {
  getAllPowers,
  getPowerById,
  createPower,
  updatePower,
  deletePower
} = require('../controllers/powerController');

const router = express.Router();

// Ruta para obtener todos los poderes
router.get('/powers', getAllPowers);

// Ruta para obtener un poder por ID
router.get('/power/:id', getPowerById);

// Ruta para crear un nuevo poder
router.post('/power', createPower);

// Ruta para actualizar un poder por ID
router.put('/power/:id', updatePower);

// Ruta para eliminar un poder por ID
router.delete('/power/:id', deletePower);

module.exports = router;