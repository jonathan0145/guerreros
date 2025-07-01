const db = require('../models'); // Importa el objeto 'db' de src/models/index.js
const { Op } = require('sequelize'); // Importa Op para operadores de Sequelize

const Match = db.Match;
const MatchPlayer = db.MatchPlayer;
const Warrior = db.Warrior;
const MatchWarrior = db.MatchWarrior;
const PlayerStat = db.PlayerStat; // Asegúrate de tener este modelo importado
const Ranking = db.Ranking; // Asegúrate de tener este modelo importado

// Función auxiliar para determinar el ganador basado en un atributo
// Recibe un array de objetos (que son los guerreros con sus propiedades directas) y el nombre del atributo a comparar.
function determineWinnerByAttribute(warriors, attribute) {
  if (!Array.isArray(warriors) || warriors.length === 0) {
    console.warn("determineWinnerByAttribute: Lista de guerreros vacía o no válida.");
    return null;
  }

  // NO necesitamos la validación 'warriors[0].Warrior' porque el objeto Warrior no está anidado así.

  const winner = warriors.reduce((prev, current) => {
    // Accede a los atributos directamente de 'prev' y 'current',
    // NO de 'prev.Warrior' o 'current.Warrior'
    const prevValue = typeof prev[attribute] !== 'undefined' ? prev[attribute] : -Infinity;
    const currentValue = typeof current[attribute] !== 'undefined' ? current[attribute] : -Infinity;

    // console.log(`Comparando ${prev.name} (${prevValue}) vs ${current.name} (${currentValue}) por ${attribute}`); // Para depuración adicional
    return (prevValue > currentValue) ? prev : current;
  });

  // El warrior_id también está directamente en el objeto 'winner'
  return winner ? winner.warrior_id : null;
}

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
    const validModes = ['poder', 'magia', 'suma'];
    if (!validModes.includes(mode)) {
      return res.status(400).json({ message: 'Modo de juego no válido. Los modos permitidos son "poder", "magia" o "suma".' });
    }

    const newMatch = await Match.create({ mode, ...otherData });
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un partido
async function updateMatch(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await Match.update(req.body, {
      where: { match_id: id }
    });
    if (updated) {
      const updatedMatch = await Match.findByPk(id);
      res.status(200).json(updatedMatch);
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
    const { id } = req.params;
    const deleted = await Match.destroy({
      where: { match_id: id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Partido eliminado' });
    } else {
      res.status(404).json({ message: 'Partido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Añadir un jugador a un partido
async function addPlayerToMatch(req, res) {
  try {
    const { matchId, playerId } = req.params;
    const match = await Match.findByPk(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    const player = await db.Player.findByPk(playerId); // Asumiendo que tienes un modelo Player
    if (!player) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    // Crea la entrada en la tabla intermedia MatchPlayer
    await MatchPlayer.create({ match_id: matchId, player_id: playerId });

    res.status(200).json({ message: `Jugador ${playerId} añadido al partido ${matchId}` });
  } catch (error) {
    console.error("Error al añadir jugador al partido:", error);
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un jugador de un partido
async function removePlayerFromMatch(req, res) {
  try {
    const { matchId, playerId } = req.params;
    const deleted = await MatchPlayer.destroy({
      where: { match_id: matchId, player_id: playerId }
    });
    if (deleted) {
      res.status(200).json({ message: `Jugador ${playerId} eliminado del partido ${matchId}` });
    } else {
      res.status(404).json({ message: 'Asociación jugador-partido no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Seleccionar guerreros para un partido (asociar guerreros a un partido)
async function selectWarriorsForMatch(req, res) {
  try {
    const { matchId, warriorIds } = req.body; // warriorIds debe ser un array [1, 2, 3]
    const match = await Match.findByPk(matchId);

    if (!match) {
      return res.status(404).json({ message: 'Partido no encontrado.' });
    }

    if (!Array.isArray(warriorIds) || warriorIds.length === 0) {
      return res.status(400).json({ message: 'Se debe proporcionar una lista de IDs de guerreros.' });
    }

    // Eliminar asociaciones existentes para este partido para evitar duplicados si se llama varias veces
    await MatchWarrior.destroy({ where: { match_id: matchId } });

    // Crear nuevas asociaciones
    const associations = warriorIds.map(warrior_id => ({ match_id: matchId, warrior_id }));
    await MatchWarrior.bulkCreate(associations);

    res.status(200).json({ message: 'Guerreros seleccionados para el partido.' });
  } catch (error) {
    console.error("Error al seleccionar guerreros para el partido:", error);
    res.status(500).json({ error: error.message });
  }
}

// Lógica para jugar un partido
async function playMatch(req, res) {
  try {
    const { matchId } = req.params;
    const match = await Match.findByPk(matchId, {
      include: [
        { model: Warrior, as: 'warriorsInMatch' } // Este 'as' coincide con tu definición
      ]
    });

    if (!match) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    console.log("Contenido REAL de match.warriorsInMatch:", JSON.stringify(match.warriorsInMatch, null, 2)); // Para ver la estructura

    // Asegúrate de que hay suficientes guerreros
    if (!match.warriorsInMatch || match.warriorsInMatch.length < 2) {
      return res.status(400).json({ message: `No hay suficientes guerreros (${match.warriorsInMatch ? match.warriorsInMatch.length : 0}) para jugar el partido. Se requieren al menos dos.` });
    }

    let winnerId;
    if (match.mode === 'poder') {
      // El atributo 'total_power' está directamente en el objeto guerrero
      winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'total_power');
    } else if (match.mode === 'magia') {
      // El atributo 'total_magic' está directamente en el objeto guerrero
      winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'total_magic');
    } else if (match.mode === 'suma') {
      // Para 'suma', calculamos un nuevo atributo 'total' en cada objeto guerrero
      const warriorsWithCalculatedTotal = match.warriorsInMatch.map(warrior => {
        // Accede a total_power y total_magic directamente del objeto 'warrior'
        const total = (warrior.total_power || 0) + (warrior.total_magic || 0);
        return { ...warrior, total: total }; // Agrega la propiedad 'total' al objeto
      });
      winnerId = determineWinnerByAttribute(warriorsWithCalculatedTotal, 'total');
    } else {
      return res.status(400).json({ message: 'Modo de juego no válido.' });
    }

    // Asegurarse de que se encontró un ganador
    if (!winnerId) {
      return res.status(500).json({ message: 'No se pudo determinar un ganador.' });
    }

    // Actualizar el partido con el ganador
    await match.update({ winner_id: winnerId, status: 'jugando' }); // 'jugando' si no ha finalizado
    res.status(200).json({ message: 'Partida jugada', winnerId });

  } catch (error) {
    console.error("Error al jugar partido:", error);
    res.status(500).json({ error: error.message });
  }
}

// Finalizar un partido y actualizar estadísticas de jugadores
async function finishMatch(req, res) {
  try {
    const { matchId } = req.params;
    let match = await Match.findByPk(matchId); // Usa 'let' para poder reasignar

    if (!match) {
      return res.status(404).json({ message: 'Partido no encontrado.' });
    }

    if (!match.winner_id) {
      return res.status(400).json({ message: 'El partido no tiene un ganador asignado para finalizar.' });
    }

    // Registrar el resultado de la partida y establecer finished_at
    await match.update({
      status: 'finalizado',
      finished_at: new Date() // ¡Aquí es donde lo actualizamos!
    });

    // Volver a cargar el objeto 'match' para que incluya los cambios recientes
    // Opcional: Si sabes que el update de Sequelize devuelve la instancia actualizada, puedes usar 'match = await match.update(...)' directamente.
    // Sin embargo, un fetch explícito es más seguro si hay múltiples actualizaciones o hooks.
    match = await Match.findByPk(matchId); // Vuelve a cargar el partido con los datos actualizados

    // Actualizar las victorias del jugador ganador
    const winner = await db.PlayerStat.findOne({ where: { player_id: match.winner_id } }); // Usar db.PlayerStat si importaste db
    if (winner) {
      winner.victories += 1;
      winner.games_played += 1;
      await winner.save();

      const ranking = await db.Ranking.findOne({ where: { player_id: match.winner_id } }); // Usar db.Ranking
      if (ranking) {
        ranking.score = winner.victories;
        await ranking.save();
      }
    }

    // Actualizar las estadísticas de los jugadores perdedores
    const losingPlayers = await db.MatchPlayer.findAll({ where: { match_id: matchId, player_id: { [db.Sequelize.Op.ne]: match.winner_id } } }); // Usar db.MatchPlayer y db.Sequelize.Op
    for (const player of losingPlayers) {
      const loserStat = await db.PlayerStat.findOne({ where: { player_id: player.player_id } });
      if (loserStat) {
        loserStat.defeats += 1;
        loserStat.games_played += 1;
        await loserStat.save();
      }
    }

    res.status(200).json({ message: 'Partida finalizada', match });
  } catch (error) {
    console.error("Error al finalizar partido:", error);
    res.status(500).json({ error: error.message });
  }
}

// Obtener la partida activa de un jugador
async function getMatchByPlayerId(req, res) {
  try {
    const { playerId } = req.params;
    // Busca la asociación del jugador con una partida (ajusta el where si quieres solo partidas activas)
    const matchPlayer = await MatchPlayer.findOne({ where: { player_id: playerId } });
    if (!matchPlayer) {
      return res.status(404).json({ message: 'No tienes partida activa' });
    }
    const match = await Match.findByPk(matchPlayer.match_id);
    if (!match) {
      return res.status(404).json({ message: 'Partida no encontrada' });
    }
    res.json({ match_id: match.match_id });
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
  finishMatch,
  getMatchByPlayerId
};