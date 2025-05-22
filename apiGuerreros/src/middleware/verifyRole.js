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
//* Uso del Middleware:

// - Aplica el middleware a las rutas que requieren permisos específicos. Por ejemplo, para una ruta que solo los administradores pueden acceder:
// ```javascript
// app.get('/admin-route', verifyRole('admin'), (req, res) => {
//   res.send('Bienvenido, administrador');
// });
//  ```
// ```