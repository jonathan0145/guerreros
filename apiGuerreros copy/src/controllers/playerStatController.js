const db = require('../models'); // Importa el objeto 'db' de src/models/index.js

const PlayerStat = db.PlayerStat; // Accede al modelo ApiUser a través del objeto db


// Obtener estadísticas de todos los jugadores
async function getAllPlayerStats(req, res) {
  try {
    const stats = await PlayerStat.findAll();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener estadísticas de un jugador por ID
async function getPlayerStatById(req, res) {
  try {
    const stat = await PlayerStat.findByPk(req.params.id);
    if (stat) {
      res.json(stat);
    } else {
      res.status(404).json({ message: 'Estadísticas no encontradas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear nuevas estadísticas para un jugador
async function createPlayerStat(req, res) {
  try {
    const newStat = await PlayerStat.create(req.body);
    res.status(201).json(newStat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar estadísticas de un jugador
async function updatePlayerStat(req, res) {
  try {
    const stat = await PlayerStat.findByPk(req.params.id);
    if (stat) {
      await stat.update(req.body);
      res.json(stat);
    } else {
      res.status(404).json({ message: 'Estadísticas no encontradas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar estadísticas de un jugador
async function deletePlayerStat(req, res) {
  try {
    const stat = await PlayerStat.findByPk(req.params.id);
    if (stat) {
      await stat.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Estadísticas no encontradas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPlayerStats,
  getPlayerStatById,
  createPlayerStat,
  updatePlayerStat,
  deletePlayerStat
};