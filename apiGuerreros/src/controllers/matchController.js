// const db = require('../models'); // Importa el objeto 'db' de src/models/index.js

// const Match = db.Match; // Accede al modelo Match a través del objeto db
// const MatchPlayer = db.MatchPlayer; // Accede al modelo MatchPlayer a través del objeto db

// const Warrior = db.Warrior; // Accede al modelo Warrior a través del objeto db
// const MatchWarrior = db.MatchWarrior; // Accede al modelo MatchWarrior a través del objeto db

// // Obtener todos los partidos
// async function getAllMatches(req, res) {
//   try {
//     const matches = await Match.findAll();
//     res.json(matches);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Obtener partido por ID
// async function getMatchById(req, res) {
//   try {
//     const match = await Match.findByPk(req.params.id);
//     if (match) {
//       res.json(match);
//     } else {
//       res.status(404).json({ message: 'Partido no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Crear un nuevo partido
// async function createMatch(req, res) {
//   try {
//     const { mode, ...otherData } = req.body;

//     // Verificar que el modo de juego sea válido
//     if (!['poder', 'magia', 'suma'].includes(mode)) {
//       return res.status(400).json({ message: 'Modo de juego inválido' });
//     }

//     // Crear la nueva partida con el modo de juego especificado
//     const newMatch = await Match.create({ mode, ...otherData });
//     res.status(201).json(newMatch);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Actualizar un partido
// async function updateMatch(req, res) {
//   try {
//     const match = await Match.findByPk(req.params.id);
//     if (match) {
//       await match.update(req.body);
//       res.json(match);
//     } else {
//       res.status(404).json({ message: 'Partido no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Eliminar un partido
// async function deleteMatch(req, res) {
//   try {
//     const match = await Match.findByPk(req.params.id);
//     if (match) {
//       await match.destroy();
//       res.status(204).send();
//     } else {
//       res.status(404).json({ message: 'Partido no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// async function addPlayerToMatch(req, res) {
//   try {
//       const { matchId, playerId } = req.params;
//       const parsedMatchId = parseInt(matchId, 10);
//       const parsedPlayerId = parseInt(playerId, 10);

//       console.log(parsedMatchId, parsedPlayerId);
      

//       // Esta línea es la única que interactúa con la base de datos
//       // Y SOLO crea un registro en la tabla INTERMEDIA MatchPlayer.
//       const matchPlayer = await MatchPlayer.create({ match_id: parsedMatchId, player_id: parsedPlayerId });

//       if (matchPlayer) {
//           res.status(200).json({ message: 'Jugador agregado al partido' });
//       } else {
//           res.status(404).json({ message: 'Error al agregar jugador al partido' });
//       }
//   } catch (error) {
//       res.status(500).json({ error: error.message });
      
//   }
// }

// // Eliminar un jugador de un partido
// async function removePlayerFromMatch(req, res) {
//   try {
//     const { matchId, playerId } = req.body;
//     const matchPlayer = await MatchPlayer.destroy({ where: { match_id: matchId, player_id: playerId } });

//     if (matchPlayer) {
//       res.status(200).json({ message: 'Jugador eliminado del partido' });
//     } else {
//       res.status(404).json({ message: 'Error al eliminar jugador del partido' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Seleccionar personajes para una partida
// async function selectWarriorsForMatch(req, res) {
//     try {
//         const { playerId, warriorIds, matchId } = req.body;

//         // Verificar que no se seleccionen más de 5 personajes
//         if (warriorIds.length > 5) {
//             return res.status(400).json({ message: 'No puedes seleccionar más de 5 personajes' });
//         }

//         // Verificar que los personajes pertenecen al jugador
//         const warriors = await Warrior.findAll({
//             where: {
//                 warrior_id: warriorIds,
//                 player_id: playerId
//             }
//         });

//         if (warriors.length !== warriorIds.length) {
//             return res.status(400).json({ message: 'Algunos personajes no pertenecen al jugador' });
//         }

//         // Asociar los personajes a la partida
//         const matchWarriors = await Promise.all(warriorIds.map(warriorId =>
//             MatchWarrior.create({ match_id: matchId, warrior_id: warriorId })
//         ));

//         res.status(200).json({ message: 'Personajes seleccionados para la partida', matchWarriors });
//     } catch (error) {
//         // *** ESTO ES LO QUE NECESITAS CAMBIAR / VERIFICAR ***
//         if (error.name === 'SequelizeValidationError') {
//             const errors = error.errors.map(err => ({
//                 path: err.path,    // El campo que falló la validación (ej: 'mode', 'name')
//                 message: err.message // El mensaje de error específico (ej: 'Match.mode cannot be null')
//             }));
//             console.error('Error de validación de Sequelize:', errors); // Esto se verá en tu consola del servidor
//             return res.status(400).json({ // Usa 400 Bad Request para errores de validación
//                 message: 'Error de validación',
//                 details: errors // Esto es lo que verás en Postman
//             });
//         } else {
//             console.error('Error en selectWarriorsForMatch:', error); // Para otros tipos de errores
//             return res.status(500).json({ error: error.message });
//         }
//     }
// }

// // Desarrollar la lógica de combate y determinar el ganador
// // async function playMatch(req, res) {
// //   try {
// //     const { matchId } = req.params;
// //     const match = await Match.findByPk(matchId, {
// //       include: [
// //         { model: Warrior, as: 'warriorsInMatch' }
// //       ]
// //     });

// //     if (!match) {
// //       return res.status(404).json({ message: 'Partido no encontrado' });
// //     }

// //     // Implementar la lógica de combate basada en el modo de juego
// //     let winnerId;
// //     if (match.mode === 'poder') {
// //       winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'power');
// //     } else if (match.mode === 'magia') {
// //       winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'magic');
// //     } else if (match.mode === 'suma') {
// //       winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'total');
// //     }

// //     // Actualizar el partido con el ganador
// //     await match.update({ winner_id: winnerId });

// //     res.status(200).json({ message: 'Partida jugada', winnerId });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // }

// // // Función auxiliar para determinar el ganador basado en un atributo
// // function determineWinnerByAttribute(warriors, attribute) {
// //   return warriors.reduce((prev, current) => {
// //     return (prev.Warrior[attribute] > current.Warrior[attribute]) ? prev : current;
// //   }).warrior_id;
// // }

// // Desarrollar la lógica de combate y determinar el ganador
// async function playMatch(req, res) {
//   try {
//     const { matchId } = req.params;
//     const match = await Match.findByPk(matchId, {
//       include: [
//         { model: Warrior, as: 'warriorsInMatch' }
//       ]
//     });

//     console.log("Contenido REAL de match.warriorsInMatch:", JSON.stringify(match.warriorsInMatch, null, 2)); // <-- ESTE ES CLAVE

//     if (!match) {
//       return res.status(404).json({ message: 'Partido no encontrado' });
//     }

//     // Asegúrate de que hay suficientes guerreros
//     if (!match.warriorsInMatch || match.warriorsInMatch.length < 2) {
//         return res.status(400).json({ message: 'Se requieren al menos dos guerreros para jugar el partido.' });
//     }

//     let winnerId;
//     if (match.mode === 'poder') {
//       // ¡CAMBIAR 'power' a 'total_power'!
//       winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'total_power');
//     } else if (match.mode === 'magia') {
//       // ¡CAMBIAR 'magic' a 'total_magic'!
//       winnerId = determineWinnerByAttribute(match.warriorsInMatch, 'total_magic');
//     } else if (match.mode === 'suma') {
//       // Para 'suma', sigue siendo recomendable calcular 'total' si no es una columna de la DB
//       const warriorsWithCalculatedTotal = match.warriorsInMatch.map(mw => {
//           if (mw.Warrior) {
//               return {
//                   ...mw,
//                   Warrior: {
//                       ...mw.Warrior,
//                       total: (mw.Warrior.total_power || 0) + (mw.Warrior.total_magic || 0)
//                   }
//               };
//           }
//           return mw; // Si por alguna razón Warrior no está presente
//       });
//       winnerId = determineWinnerByAttribute(warriorsWithCalculatedTotal, 'total');
//     } else {
//         return res.status(400).json({ message: 'Modo de juego no válido.' });
//     }

//     // Asegurarse de que se encontró un ganador
//     if (!winnerId) {
//         return res.status(500).json({ message: 'No se pudo determinar un ganador.' });
//     }

//     // Actualizar el partido con el ganador
//     await match.update({ winner_id: winnerId });

//     res.status(200).json({ message: 'Partida jugada', winnerId });
//   } catch (error) {
//     console.error("Error al jugar partido:", error); // Para ver el error completo en la consola
//     res.status(500).json({ error: error.message });
//   }
// }

// // La función determineWinnerByAttribute puede quedarse igual, ya que 'attribute' ahora pasará 'total_power', 'total_magic' o 'total'
// function determineWinnerByAttribute(warriors, attribute) {
//   // Añadir una validación básica aquí para evitar errores si warriors está vacío o null
//   if (!Array.isArray(warriors) || warriors.length === 0) {
//       console.warn("determineWinnerByAttribute recibió una lista de guerreros vacía o no válida.");
//       return null;
//   }

//   // Asegurarse de que el primer elemento y su propiedad Warrior existan
//   // Esto es para manejar el caso de una lista con un solo elemento si reduce() falla,
//   // aunque la validación anterior debería capturar la mayoría de los casos de lista vacía.
//   if (!warriors[0] || !warriors[0].Warrior) {
//       console.error("El primer guerrero o su objeto anidado 'Warrior' es indefinido.");
//       return null;
//   }

//   const winner = warriors.reduce((prev, current) => {
//     // Es crucial que prev.Warrior y current.Warrior no sean undefined
//     // Si prev.Warrior o current.Warrior son undefined, el error persistirá
//     // La depuración con console.log(JSON.stringify(match.warriorsInMatch, null, 2)); es clave
//     // para entender si prev.Warrior existe.
//     const prevValue = prev.Warrior ? prev.Warrior[attribute] : -Infinity; // Asignar un valor bajo si es undefined
//     const currentValue = current.Warrior ? current.Warrior[attribute] : -Infinity; // para que no se rompa la comparación

//     return (prevValue > currentValue) ? prev : current;
//   });

//   // Asegurarse de que el objeto ganador y su warrior_id existan
//   return winner ? winner.warrior_id : null;
// }

// // Finalizar una partida y registrar el resultado
// async function finishMatch(req, res) {
//   try {
//     const { matchId } = req.params;
//     const match = await Match.findByPk(matchId);

//     if (!match) {
//       return res.status(404).json({ message: 'Partido no encontrado' });
//     }

//     // Registrar el resultado de la partida
//     await match.update({ status: 'finalizado' });

//     // Actualizar las victorias del jugador ganador
//     const winner = await PlayerStat.findOne({ where: { player_id: match.winner_id } });
//     if (winner) {
//       winner.victories += 1;
//       winner.games_played += 1; // Incrementar partidas jugadas
//       await winner.save();

//       // Actualizar el score en el ranking
//       const ranking = await Ranking.findOne({ where: { player_id: match.winner_id } });
//       if (ranking) {
//         ranking.score = winner.victories;
//         await ranking.save();
//       }
//     }

//     // Actualizar las estadísticas de los jugadores perdedores
//     const losingPlayers = await MatchPlayer.findAll({ where: { match_id: matchId, player_id: { [Op.ne]: match.winner_id } } });
//     for (const player of losingPlayers) {
//       const loserStat = await PlayerStat.findOne({ where: { player_id: player.player_id } });
//       if (loserStat) {
//         loserStat.defeats += 1;
//         loserStat.games_played += 1; // Incrementar partidas jugadas
//         await loserStat.save();
//       }
//     }

//     res.status(200).json({ message: 'Partida finalizada', match });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// module.exports = {
//   getAllMatches,
//   getMatchById,
//   createMatch,
//   updateMatch,
//   deleteMatch,
//   addPlayerToMatch,
//   removePlayerFromMatch,
//   selectWarriorsForMatch,
//   playMatch,
//   finishMatch
// };

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

// // Finalizar un partido y actualizar estadísticas de jugadores
// async function finishMatch(req, res) {
//   try {
//     const { matchId } = req.params;
//     const match = await Match.findByPk(matchId);

//     if (!match) {
//       return res.status(404).json({ message: 'Partido no encontrado.' });
//     }

//     if (!match.winner_id) {
//       return res.status(400).json({ message: 'El partido no tiene un ganador asignado para finalizar.' });
//     }

//     // Registrar el resultado de la partida
//     await match.update({ status: 'finalizado' });

//     // Actualizar las victorias del jugador ganador
//     const winner = await PlayerStat.findOne({ where: { player_id: match.winner_id } });
//     if (winner) {
//       winner.victories += 1;
//       winner.games_played += 1; // Incrementar partidas jugadas
//       await winner.save();

//       // Actualizar el score en el ranking
//       const ranking = await Ranking.findOne({ where: { player_id: match.winner_id } });
//       if (ranking) {
//         ranking.score = winner.victories;
//         await ranking.save();
//       }
//     }

//     // Actualizar las estadísticas de los jugadores perdedores
//     const losingPlayers = await MatchPlayer.findAll({ where: { match_id: matchId, player_id: { [Op.ne]: match.winner_id } } });
//     for (const player of losingPlayers) {
//       const loserStat = await PlayerStat.findOne({ where: { player_id: player.player_id } });
//       if (loserStat) {
//         loserStat.defeats += 1;
//         loserStat.games_played += 1; // Incrementar partidas jugadas
//         await loserStat.save();
//       }
//     }

//     res.status(200).json({ message: 'Partida finalizada', match });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

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
};