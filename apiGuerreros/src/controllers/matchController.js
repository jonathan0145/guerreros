const Match = require('../models/Match');
const MatchPlayer = require('../models/MatchPlayer'); // Importar el modelo MatchPlayer

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

// Asociar un jugador a un partido
async function addPlayerToMatch(req, res) {
  try {
    const { matchId, playerId } = req.body;
    const matchPlayer = await MatchPlayer.create({ match_id: matchId, player_id: playerId });

    if (matchPlayer) {
      res.status(200).json({ message: 'Jugador agregado al partido' });
    } else {
      res.status(404).json({ message: 'Error al agregar jugador al partido' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un jugador de un partido
async function removePlayerFromMatch(req, res) {
  try {
    const { matchId, playerId } = req.body;
    const matchPlayer = await MatchPlayer.destroy({ where: { match_id: matchId, player_id: playerId } });

    if (matchPlayer) {
      res.status(200).json({ message: 'Jugador eliminado del partido' });
    } else {
      res.status(404).json({ message: 'Error al eliminar jugador del partido' });
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
  deleteMatch,
  addPlayerToMatch, // Añadido aquí
  removePlayerFromMatch // Añadido aquí
};