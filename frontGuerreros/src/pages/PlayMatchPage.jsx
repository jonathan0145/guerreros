// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import * as matchService from '../services/matchService';

// const PlayMatchPage = () => {
//   const { matchId } = useParams();
//   const [players, setPlayers] = useState([]);
//   const [winner, setWinner] = useState(null);
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Bearer ${token}` } };

// //   useEffect(() => {
// //     // Supón que getMatchById te trae los jugadores y sus guerreros
// //     matchService.getMatchById(matchId, config)
// //       .then(res => setPlayers(res.data.players || []));
// //   }, [matchId, token]);

//     useEffect(() => {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         matchService.getMatchById(matchId, config)
//     .then(res => setPlayers(res.data.players || []));
//     }, [matchId, token]);

//   const handlePlay = () => {
//     matchService.playMatch(matchId, {}, config)
//       .then(res => setWinner(res.data.winnerId));
//   };

//   return (
//     <div>
//       <h2>Partida #{matchId}</h2>
//       <div style={{ display: 'flex', gap: 40 }}>
//         {players.map(player => (
//           <div key={player.player_id}>
//             <h4>{player.username || `Jugador ${player.player_id}`}</h4>
//             <div style={{ display: 'flex', gap: 16 }}>
//               {player.warriors && player.warriors.map(card => (
//                 <div key={card.warrior_id} style={{ border: '1px solid gray', padding: 10 }}>
//                   <strong>{card.name}</strong>
//                   <div>{card.description}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="btn btn-danger mt-4" onClick={handlePlay}>
//         Jugar
//       </button>
//       {winner && <div className="alert alert-success mt-3">¡Ganador: {winner}!</div>}
//     </div>
//   );
// };

// export default PlayMatchPage;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import * as matchService from '../services/matchService';

// const PlayMatchPage = () => {
//   const { matchId } = useParams();
//   const [players, setPlayers] = useState([]);
//   const [winner, setWinner] = useState(null);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     matchService.getMatchById(matchId, config)
//       .then(res => {
//         // Si res.data.warriorsInMatch es el array de guerreros:
//         const warriors = res.data.warriorsInMatch || [];
//         // Agrupa por player_id:
//         const grouped = {};
//         warriors.forEach(w => {
//           if (!grouped[w.player_id]) grouped[w.player_id] = [];
//           grouped[w.player_id].push(w);
//         });
//         // Convierte a array de jugadores:
//         const playersArr = Object.entries(grouped).map(([player_id, warriors]) => ({
//           player_id,
//           warriors
//         }));
//         setPlayers(playersArr);
//       });
//   }, [matchId, token]);

//   const handlePlay = () => {
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     matchService.playMatch(matchId, {}, config)
//       .then(res => setWinner(res.data.winnerId));
//   };

//   return (
//     <div>
//       <h2>Partida #{matchId}</h2>
//       <div style={{ display: 'flex', gap: 40 }}>
//         {players.map(player => (
//           <div key={player.player_id}>
//             <h4>Jugador {player.player_id}</h4>
//             <div style={{ display: 'flex', gap: 16 }}>
//               {player.warriors.map(card => (
//                 <div key={card.warrior_id} style={{ border: '1px solid gray', padding: 10 }}>
//                   <strong>{card.name}</strong>
//                   <div>Poder: {card.total_power} | Magia: {card.total_magic}</div>
//                   <div>Vida: {card.health}</div>
//                   <div>
//                     <b>Poderes:</b>
//                     <ul>
//                       {card.powers.map(power => (
//                         <li key={power.power_id}>{power.name}: {power.description}</li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div>
//                     <b>Hechizos:</b>
//                     <ul>
//                       {card.spells.map(spell => (
//                         <li key={spell.spell_id}>{spell.name}: {spell.description}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="btn btn-danger mt-4" onClick={handlePlay}>
//         Jugar
//       </button>
//       {/* <button
//         className="btn btn-secondary mt-2"
//         onClick={() => {
//           const config = { headers: { Authorization: `Bearer ${token}` } };
//           matchService.finishMatch(matchId, {}, config)
//             .then(() => alert('¡Partida finalizada!'));
//         }}
//       >
//         Finalizar partida
//       </button> */}
//     <button
//         className="btn btn-secondary mt-2"
//         onClick={() => {
//             const config = { headers: { Authorization: `Bearer ${token}` } };
//             matchService.finishMatch(matchId, {}, config)
//                 .then(res => {
//                     const winnerId = res.data.match.winner_id;
//                     alert(`¡Partida finalizada!\nGanador: ${winnerId}`);
//                 });
//              }}
//     >
//         Finalizar partida
//     </button>
//       {winner && <div className="alert alert-success mt-3">¡Ganador: {winner}!</div>}
//     </div>
//   );
// };

// export default PlayMatchPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as matchService from '../services/matchService';

const PlayMatchPage = () => {
  const { matchId } = useParams();
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    matchService.getMatchById(matchId, config)
      .then(res => {
        const warriors = res.data.warriorsInMatch || [];
        const grouped = {};
        warriors.forEach(w => {
          if (!grouped[w.player_id]) grouped[w.player_id] = [];
          grouped[w.player_id].push(w);
        });
        const playersArr = Object.entries(grouped).map(([player_id, warriors]) => ({
          player_id,
          warriors
        }));
        setPlayers(playersArr);
      });
  }, [matchId, token]);

  const handlePlay = () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    matchService.playMatch(matchId, {}, config)
      .then(res => setWinner(res.data.winnerId));
  };

  const handleFinish = () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    matchService.finishMatch(matchId, {}, config)
      .then(res => {
        const winnerId = res.data.match.winner_id;
        alert(`¡Partida finalizada!\nGanador: ${winnerId}`);
        navigate('/lobby');
      });
  };

  return (
    <div>
      <h2>Partida #{matchId}</h2>
      <div style={{ display: 'flex', gap: 40 }}>
        {players.map(player => (
          <div key={player.player_id}>
            <h4>Jugador {player.player_id}</h4>
            <div style={{ display: 'flex', gap: 16 }}>
              {player.warriors.map(card => (
                <div key={card.warrior_id} style={{ border: '1px solid gray', padding: 10 }}>
                  <strong>{card.name}</strong>
                  <div>Poder: {card.total_power} | Magia: {card.total_magic}</div>
                  <div>Vida: {card.health}</div>
                  <div>
                    <b>Poderes:</b>
                    <ul>
                      {card.powers.map(power => (
                        <li key={power.power_id}>{power.name}: {power.description}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <b>Hechizos:</b>
                    <ul>
                      {card.spells.map(spell => (
                        <li key={spell.spell_id}>{spell.name}: {spell.description}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-danger mt-4" onClick={handlePlay}>
        Jugar
      </button>
      <button
        className="btn btn-secondary mt-2"
        onClick={handleFinish}
      >
        Finalizar partida
      </button>
      {winner && <div className="alert alert-success mt-3">¡Ganador: {winner}!</div>}
    </div>
  );
};

export default PlayMatchPage;