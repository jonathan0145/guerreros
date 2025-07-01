// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import '../../style/LoginPage.css';
// import axios from 'axios';

// function LoginPage() {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   try {
//     const res = await axios.post('http://localhost:3000/api/loginplayer', form);
//     const { token, role, player_id } = res.data;
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//     if (player_id) localStorage.setItem('player_id', player_id);

//     if (role === 'admin') {
//       navigate('/admin');
//     } else if (role === 'user') {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       try {
//         // const matchRes = await axios.get(`http://localhost:3000/api/match/player/${player_id}`, config);
//         // const matchId = matchRes.data.match_id;
//         // navigate(`/match/${matchId}`);
//         const matchRes = await axios.get(`http://localhost:3000/api/match/player/${player_id}`, config);
//         const matchId = matchRes.data.match_id;
//         navigate(`/match/${matchId}/select-cards`);
//       } catch {
//         // Si no tiene partida, lo mandas al lobby
//         navigate('/lobby');
//       }
//     } else {
//       navigate('/');
//     }
//   } catch {
//     setError('Credenciales inválidas');
//   }
//   };

//   return (
//     <div className="video-background">
//       <iframe 
//         className="video" 
//         src="https://www.youtube.com/embed/smamknOCRGw?si=p5rTg2GgbA3Zecxd&amp;controls=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=smamknOCRGw&amp;rel=0" 
//         title="YouTube video player" 
//         frameBorder="0" 
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//         referrerPolicy="strict-origin-when-cross-origin" 
//         allowFullScreen
//       />
//       <div className="transparent-wrapper">
//         <div className="container mt-5 login-container">
//           <div className="row justify-content-center">
//             <div className="col-md-6">
//               <div className="card">
//                 <div className="card-body">
//                   <h2 className="card-title text-center">Login</h2>
//                   <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                       <label htmlFor="username">Username:</label>
//                       <input type="text" id="username" name="username" className="form-control" required value={form.username} onChange={handleChange} />
//                     </div>
//                     <div className="form-group mt-3">
//                       <label htmlFor="password">Password:</label>
//                       <input type="password" id="password" name="password" className="form-control" required value={form.password} onChange={handleChange} />
//                     </div>
//                     {error && <div className="alert alert-danger mt-3">{error}</div>}
//                     <button type="submit" className="btn btn-primary mt-4 w-100">Entrar</button>
//                   </form>
//                   <Link to="/register" className="d-block text-center mt-3">Registrarse</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../style/LoginPage.css';
import axios from 'axios';
import * as matchService from '../services/matchService'; // Asegúrate de importar tu servicio

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/api/loginplayer', form);
      const { token, role, player_id } = res.data;
      console.log('player_id recibido:', player_id);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      if (player_id) localStorage.setItem('player_id', player_id);

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'user') {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const player_id = localStorage.getItem('player_id');
        console.log('player_id usado:', player_id); // <-- AQUÍ
        try {
          // Usa el servicio en vez de axios.get directo
          const matchRes = await matchService.getMatchByPlayerId(player_id, config);
          const matchId = matchRes.data.match_id;
          navigate(`/match/${matchId}/select-cards`);
        } catch {
          navigate('/lobby');
        }
      } else {
        navigate('/');
      }
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="video-background">
      <iframe 
        className="video" 
        src="https://www.youtube.com/embed/smamknOCRGw?si=p5rTg2GgbA3Zecxd&amp;controls=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=smamknOCRGw&amp;rel=0" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      />
      <div className="transparent-wrapper">
        <div className="container mt-5 login-container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center">Login</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username:</label>
                      <input type="text" id="username" name="username" className="form-control" required value={form.username} onChange={handleChange} />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password">Password:</label>
                      <input type="password" id="password" name="password" className="form-control" required value={form.password} onChange={handleChange} />
                    </div>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    <button type="submit" className="btn btn-primary mt-4 w-100">Entrar</button>
                  </form>
                  <Link to="/register" className="d-block text-center mt-3">Registrarse</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;