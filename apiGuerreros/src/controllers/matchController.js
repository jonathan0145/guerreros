const db = require('../models'); // Importa el objeto 'db' de src/models/index.js

const Match = db.Match; // Accede al modelo Match a través del objeto db
const MatchPlayer = db.MatchPlayer; // Accede al modelo MatchPlayer a través del objeto db

const Warrior = db.Warrior; // Accede al modelo Warrior a través del objeto db
const MatchWarrior = db.MatchWarrior; // Accede al modelo MatchWarrior a través del objeto db

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
    const { mode, ...otherData } = req.body;

    // Verificar que el modo de juego sea válido
    if (!['poder', 'magia', 'suma'].includes(mode)) {
      return res.status(400).json({ message: 'Modo de juego inválido' });
    }

    // Crear la nueva partida con el modo de juego especificado
    const newMatch = await Match.create({ mode, ...otherData });
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

async function addPlayerToMatch(req, res) {
  try {
      const { matchId, playerId } = req.params;
      const parsedMatchId = parseInt(matchId, 10);
      const parsedPlayerId = parseInt(playerId, 10);

      console.log(parsedMatchId, parsedPlayerId);
      

      // Esta línea es la única que interactúa con la base de datos
      // Y SOLO crea un registro en la tabla INTERMEDIA MatchPlayer.
      const matchPlayer = await MatchPlayer.create({ match_id: parsedMatchId, player_id: parsedPlayerId });

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

// Seleccionar personajes para una partida
async function selectWarriorsForMatch(req, res) {
    try {
        const { playerId, warriorIds, matchId } = req.body;

        // Verificar que no se seleccionen más de 5 personajes
        if (warriorIds.length > 5) {
            return res.status(400).json({ message: 'No puedes seleccionar más de 5 personajes' });
        }

        // Verificar que los personajes pertenecen al jugador
        const warriors = await Warrior.findAll({
            where: {
                warrior_id: warriorIds,
                player_id: playerId
            }
        });

        if (warriors.length !== warriorIds.length) {
            return res.status(400).json({ message: 'Algunos personajes no pertenecen al jugador' });
        }

        // Asociar los personajes a la partida
        const matchWarriors = await Promise.all(warriorIds.map(warriorId =>
            MatchWarrior.create({ match_id: matchId, warrior_id: warriorId })
        ));

        res.status(200).json({ message: 'Personajes seleccionados para la partida', matchWarriors });
    } catch (error) {
        // *** ESTO ES LO QUE NECESITAS CAMBIAR / VERIFICAR ***
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => ({
                path: err.path,    // El campo que falló la validación (ej: 'mode', 'name')
                message: err.message // El mensaje de error específico (ej: 'Match.mode cannot be null')
            }));
            console.error('Error de validación de Sequelize:', errors); // Esto se verá en tu consola del servidor
            return res.status(400).json({ // Usa 400 Bad Request para errores de validación
                message: 'Error de validación',
                details: errors // Esto es lo que verás en Postman
            });
        } else {
            console.error('Error en selectWarriorsForMatch:', error); // Para otros tipos de errores
            return res.status(500).json({ error: error.message });
        }
    }
}

// Desarrollar la lógica de combate y determinar el ganador
async function playMatch(req, res) {
  try {
    const { matchId } = req.params;
    const match = await Match.findByPk(matchId, {
      include: [
        { model: Warrior, as: 'warriorsInMatch' }
      ]
    });

    if (!match) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    // Implementar la lógica de combate basada en el modo de juego
    let winnerId;
    if (match.mode === 'poder') {
      winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'power');
    } else if (match.mode === 'magia') {
      winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'magic');
    } else if (match.mode === 'suma') {
      winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'total');
    }

    // Actualizar el partido con el ganador
    await match.update({ winner_id: winnerId });

    res.status(200).json({ message: 'Partida jugada', winnerId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Función auxiliar para determinar el ganador basado en un atributo
function determineWinnerByAttribute(warriors, attribute) {
  return warriors.reduce((prev, current) => {
    return (prev.Warrior[attribute] > current.Warrior[attribute]) ? prev : current;
  }).warrior_id;
}

// Finalizar una partida y registrar el resultado
async function finishMatch(req, res) {
  try {
    const { matchId } = req.params;
    const match = await Match.findByPk(matchId);

    if (!match) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    // Registrar el resultado de la partida
    await match.update({ status: 'finalizado' });

    // Actualizar las victorias del jugador ganador
    const winner = await PlayerStat.findOne({ where: { player_id: match.winner_id } });
    if (winner) {
      winner.victories += 1;
      winner.games_played += 1; // Incrementar partidas jugadas
      await winner.save();

      // Actualizar el score en el ranking
      const ranking = await Ranking.findOne({ where: { player_id: match.winner_id } });
      if (ranking) {
        ranking.score = winner.victories;
        await ranking.save();
      }
    }

    // Actualizar las estadísticas de los jugadores perdedores
    const losingPlayers = await MatchPlayer.findAll({ where: { match_id: matchId, player_id: { [Op.ne]: match.winner_id } } });
    for (const player of losingPlayers) {
      const loserStat = await PlayerStat.findOne({ where: { player_id: player.player_id } });
      if (loserStat) {
        loserStat.defeats += 1;
        loserStat.games_played += 1; // Incrementar partidas jugadas
        await loserStat.save();
      }
    }

    res.status(200).json({ message: 'Partida finalizada', match });
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
  addPlayerToMatch,
  removePlayerFromMatch,
  selectWarriorsForMatch,
  playMatch,
  finishMatch
};