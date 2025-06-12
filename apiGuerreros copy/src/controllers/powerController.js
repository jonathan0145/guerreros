const Power = require('../models/Power');

// Obtener todos los poderes
async function getAllPowers(req, res) {
  try {
    const powers = await Power.findAll();
    res.json(powers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener poder por ID
async function getPowerById(req, res) {
  try {
    const power = await Power.findByPk(req.params.id);
    if (power) {
      res.json(power);
    } else {
      res.status(404).json({ message: 'Poder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo poder
async function createPower(req, res) {
  try {
    const newPower = await Power.create(req.body);
    res.status(201).json(newPower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un poder
async function updatePower(req, res) {
  try {
    const power = await Power.findByPk(req.params.id);
    if (power) {
      await power.update(req.body);
      res.json(power);
    } else {
      res.status(404).json({ message: 'Poder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un poder
async function deletePower(req, res) {
  try {
    const power = await Power.findByPk(req.params.id);
    if (power) {
      await power.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Poder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPowers,
  getPowerById,
  createPower,
  updatePower,
  deletePower
};