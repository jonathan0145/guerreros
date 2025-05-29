import React from 'react';
import { Link } from 'react-router-dom';
import '../../stile/LoginPage.css';

function LoginPage() {
  return (
    <div className="video-background">
      <iframe className="video" src="https://www.youtube.com/embed/TYarYaxnOIw?autoplay=1&mute=1&loop=1&playlist=TYarYaxnOIw&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" className="form-control" required />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" className="form-control" required />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4 w-100">Entrar</button>
                </form>
                <Link to="/register" className="d-block text-center mt-3">Registrarse</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;