const db = require('../models'); // Importa el objeto 'db' de src/models/index.js

const Ranking = db.Ranking; // Accede al modelo ApiUser a través del objeto db

// Obtener el ranking de todos los jugadores
async function getAllRankings(req, res) {
  try {
    const rankings = await Ranking.findAll({ order: [['score', 'DESC']] });
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener ranking de un jugador por ID
async function getRankingById(req, res) {
  try {
    const ranking = await Ranking.findByPk(req.params.id);
    if (ranking) {
      res.json(ranking);
    } else {
      res.status(404).json({ message: 'Ranking no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo ranking
async function createRanking(req, res) {
  try {
    const newRanking = await Ranking.create(req.body);
    res.status(201).json(newRanking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar el ranking de un jugador
async function updateRanking(req, res) {
  try {
    const ranking = await Ranking.findByPk(req.params.id);
    if (ranking) {
      await ranking.update(req.body);
      res.json(ranking);
    } else {
      res.status(404).json({ message: 'Ranking no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un ranking
async function deleteRanking(req, res) {
  try {
    const ranking = await Ranking.findByPk(req.params.id);
    if (ranking) {
      await ranking.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Ranking no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllRankings,
  getRankingById,
  createRanking,
  updateRanking,
  deleteRanking
};

// Para implementar la creación de un ranking que se actualice automáticamente al finalizar cada partida, puedes agregar una función en tu controlador que maneje la creación de un nuevo registro de ranking. Esta función se llamará desde la lógica de negocio del juego cuando una partida termine. Aquí te muestro cómo podrías hacerlo: