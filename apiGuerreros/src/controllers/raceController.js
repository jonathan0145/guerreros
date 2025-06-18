const db = require('../models'); // Importa el objeto 'db' de src/models/index.js

const Race = db.Race; // Accede al modelo ApiUser a través del objeto db


// Obtener todas las razas
async function getAllRaces(req, res) {
  try {
    const races = await Race.findAll();
    res.json(races);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener raza por ID
async function getRaceById(req, res) {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      res.json(race);
    } else {
      res.status(404).json({ message: 'Raza no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear una nueva raza
async function createRace(req, res) {
  try {
    const newRace = await Race.create(req.body);
    res.status(201).json(newRace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar una raza
async function updateRace(req, res) {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      await race.update(req.body);
      res.json(race);
    } else {
      res.status(404).json({ message: 'Raza no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar una raza
async function deleteRace(req, res) {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      await race.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Raza no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllRaces,
  getRaceById,
  createRace,
  updateRace,
  deleteRace
};