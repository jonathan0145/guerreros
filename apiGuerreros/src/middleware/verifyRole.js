const jwt = require('jsonwebtoken');

function verifyRole(...requiredRoles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verificar si el encabezado de autorización está presente
    if (!authHeader) {
      return res.status(401).json({ message: 'Falta el encabezado de autorización' });
    }

    const token = authHeader.split(' ')[1];

    // Verificar si el token está presente
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

module.exports = { verifyRole };