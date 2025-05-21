const Warrior = require('../models/Warrior');

async function getWarrior(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      res.json(warrior);
    } else {
      res.status(404).json({ error: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createWarrior(req, res) {
  try {
    const newWarrior = await Warrior.create(req.body);
    res.status(201).json(newWarrior);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Agregar función updateWarrior
async function updateWarrior(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      await warrior.update(req.body);
      res.json(warrior);
    } else {
      res.status(404).json({ error: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Agregar función deleteWarrior
async function deleteWarrior(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      await warrior.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllWarriors(req, res) {
  try {
    const warriors = await Warrior.findAll();
    res.json(warriors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getWarrior, createWarrior, updateWarrior, deleteWarrior, getAllWarriors };