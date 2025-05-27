const jwt = require('jsonwebtoken');

function verifyPlayerRole(...requiredRoles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Falta el encabezado de autorización' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
      const decoded = jwt.verify(token, 'secreto');
      if (!requiredRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  };
}

module.exports = { verifyPlayerRole };