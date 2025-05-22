// filepath: src/middleware/auth.js
const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No autorizado' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secreto');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Solo admin' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = { verifyAdmin };