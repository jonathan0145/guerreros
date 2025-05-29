import React from 'react';
import { Link } from 'react-router-dom';
import '../../stile/LoginPage.css';

function RegisterPage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
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
  );
}

export default RegisterPage;