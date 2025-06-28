import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLayout from './components/admin/AdminLayout';
import './App.css';

// Importar las páginas de las tablas
import Match from './pages/tablas/match';
import Warrior from './pages/tablas/Warrior';
import WarriorPower from './pages/tablas/WarriorPower';
import WarriorSpell from './pages/tablas/WarriorSpell';
import Player from './pages/tablas/Player';
import PlayerStat from './pages/tablas/Playerstat';
import Power from './pages/tablas/Power';
import Spell from './pages/tablas/Spell';
import MatchPlayer from './pages/tablas/MatchPlayer';
import MatchWarrior from './pages/tablas/MatchWarrior';
import Race from './pages/tablas/Race';
import WarriorType from './pages/tablas/WarriorType';
import Ranking from './pages/tablas/Ranking';

//* imports de juego
import Lobby from './pages/Lobby';
import SelectCardsPage from './pages/SelectCardPage';

function RequireUserRole({ children }) {
  const role = localStorage.getItem('role');
  return role === 'user' ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="container1">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Ruta protegida para Lobby */}
          <Route
            path="/lobby"
            element={
              <RequireUserRole>
                <Lobby />
              </RequireUserRole>
            }
          />

          <Route path="/match/:matchId/select-cards" element={<SelectCardsPage />} />

          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Match />} />
          <Route path="player" element={<Player />} />
          {/* <Route path="inmuebles/crear" element={<CreateProperty />} />
          <Route path="inmuebles/editar/:id" element={<EditProperty />} />
          <Route path="visualizaciones" element={<Visualizations />} /> */}
          <Route path="matchplayer" element={<MatchPlayer />} />
          <Route path="power" element={<Power />} />
          <Route path="spell" element={<Spell />} />
          <Route path="warrior" element={<Warrior />} />
          <Route path="warriorpower" element={<WarriorPower />} />
          <Route path="warriorspell" element={<WarriorSpell />} />
          <Route path="playerstat" element={<PlayerStat />} />
          <Route path="matchwarrior" element={<MatchWarrior />} />
          <Route path="race" element={<Race />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="warriortype" element={<WarriorType />} />
        </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
