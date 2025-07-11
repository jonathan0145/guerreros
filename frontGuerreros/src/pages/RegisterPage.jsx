// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../../style/LoginPage.css';

// function RegisterPage() {
//   return (
//     <div className="video-background">
//       <iframe 
//         className="video" 
//         src="https://www.youtube.com/embed/smamknOCRGw?si=p5rTg2GgbA3Zecxd&amp;controls=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=smamknOCRGw&amp;rel=0" 
//         title="YouTube video player" 
//         frameborder="0" 
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//         referrerpolicy="strict-origin-when-cross-origin" 
//         allowfullscreen
//       />
//       <div className="transparent-wrapper">
//         <div className="container mt-5 login-container">
//           <div className="row justify-content-center">
//             <div className="col-md-6">
//               <div className="card">
//                 <div className="card-body">
//                   <h2 className="card-title text-center">Register</h2>
//                   <form>
//                     <div className="form-group">
//                       <label htmlFor="username">Username:</label>
//                       <input type="text" id="username" name="username" className="form-control" required />
//                     </div>
//                     <div className="form-group mt-3">
//                       <label htmlFor="password">Password:</label>
//                       <input type="password" id="password" name="password" className="form-control" required />
//                     </div>
//                     <button type="submit" className="btn btn-primary mt-4 w-100">Registrarse</button>
//                   </form>
//                   <Link to="/login" className="d-block text-center mt-3">Iniciar Sesión</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/LoginPage.css';
import axios from 'axios';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:3000/api/registerplayer', form);
      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      setError('No se pudo registrar. Intenta con otro usuario.');
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
                  <h2 className="card-title text-center">Register</h2>
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
                    {success && <div className="alert alert-success mt-3">{success}</div>}
                    <button type="submit" className="btn btn-primary mt-4 w-100">Registrarse</button>
                  </form>
                  <Link to="/login" className="d-block text-center mt-3">Iniciar Sesión</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;