const Warrior = require('../models/Warrior');

// Obtener todos los guerreros
async function getAllWarriors(req, res) {
  try {
    const warriors = await Warrior.findAll();
    res.json(warriors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener guerrero por ID
async function getWarriorById(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      res.json(warrior);
    } else {
      res.status(404).json({ message: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo guerrero
async function createWarrior(req, res) {
  try {
    const newWarrior = await Warrior.create(req.body);
    res.status(201).json(newWarrior);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un guerrero
async function updateWarrior(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      await warrior.update(req.body);
      res.json(warrior);
    } else {
      res.status(404).json({ message: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un guerrero
async function deleteWarrior(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      await warrior.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllWarriors,
  getWarriorById,
  createWarrior,
  updateWarrior,
  deleteWarrior
};