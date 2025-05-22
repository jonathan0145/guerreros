const Match = require('../models/Match');

// Obtener todos los partidos
async function getAllMatches(req, res) {
  try {
    const matches = await Match.findAll();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener partido por ID
async function getMatchById(req, res) {
  try {
    const match = await Match.findByPk(req.params.id);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ message: 'Partido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo partido
async function createMatch(req, res) {
  try {
    const newMatch = await Match.create(req.body);
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un partido
async function updateMatch(req, res) {
  try {
    const match = await Match.findByPk(req.params.id);
    if (match) {
      await match.update(req.body);
      res.json(match);
    } else {
      res.status(404).json({ message: 'Partido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un partido
async function deleteMatch(req, res) {
  try {
    const match = await Match.findByPk(req.params.id);
    if (match) {
      await match.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Partido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch
};