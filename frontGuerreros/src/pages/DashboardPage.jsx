import React from 'react';

function DashboardPage() {
  return (
    <div className="d-flex w-100" style={{maxWidth: '2400px', margin: '0 auto', minWidth: '100%'}}>
      {/* Sidebar */}
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: '280px', height: '100vh'}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">Dashboard</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link text-white" aria-current="page">
              1. Opción Uno
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              2. Opción Dos
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              3. Opción Tres
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              4. Opción Cuatro
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              5. Opción Cinco
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              6. Opción Seis
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              7. Opción Siete
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              8. Opción Ocho
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              9. Opción Nueve
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              10. Opción Diez
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <div className="container">
          <h1 className="h2 mb-4">Bienvenido al Dashboard</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Panel Principal</h5>
              <p className="card-text">Selecciona una opción del menú lateral para comenzar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;