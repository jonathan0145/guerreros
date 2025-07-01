import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as matchService from '../services/matchService';
import * as warriorService from '../services/warriorService';

const SelectCardsPage = () => {
  const { matchId } = useParams();
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const playerId = Number(localStorage.getItem('player_id'));
  const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        warriorService.getAllWarriors(config)
        .then(res => {
            const myWarriors = res.data.filter(w => w.player_id === playerId);
            setCards(myWarriors);
    })
    .catch(() => setCards([]));
    }, [playerId, token]);

  const handleSelect = (card) => {
    if (selected.includes(card.warrior_id)) {
      setSelected(selected.filter(id => id !== card.warrior_id));
    } else if (selected.length < 5) {
      setSelected([...selected, card.warrior_id]);
    }
  };

  const handleConfirm = () => {
  matchService.selectWarriorsForMatch(
    {
      playerId,
      warriorIds: selected,
      matchId: Number(matchId)
    },
    config
  )
  .then(() => navigate(`/match/${matchId}`))
  .catch(err => {
    console.log('Error al seleccionar guerreros:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'No tienes permisos o ya seleccionaste tus guerreros.');
  });
};

  const handleStartMatch = () => {
      navigate(`/match/${matchId}/play`);
  };

  return (
    <div>
      <h2>Selecciona tus 5 guerreros</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {cards.map(card => (
          <div
            key={card.warrior_id}
            style={{
              border: selected.includes(card.warrior_id) ? '2px solid green' : '1px solid gray',
              padding: 10,
              cursor: 'pointer'
            }}
            onClick={() => handleSelect(card)}
          >
            <strong>{card.name}</strong>
            <div>{card.description}</div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-4"
        disabled={selected.length !== 5}
        onClick={handleConfirm}
      >
        Confirmar selección
      </button>
      <button
        className="btn btn-success mt-2"
        disabled={selected.length !== 5}
        onClick={handleStartMatch}
      >
        Iniciar partida
      </button>
    </div>
  );
};

export default SelectCardsPage;