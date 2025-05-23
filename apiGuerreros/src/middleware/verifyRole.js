function verifyRole(requiredRole) {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secreto');
    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
}

module.exports = { verifyRole };