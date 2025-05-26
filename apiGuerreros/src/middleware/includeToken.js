const ApiUser = require('../models/ApiUser');

async function includeToken(req, res, next) {
  try {
    const { username } = req.body; // O de donde obtengas el username
    const user = await ApiUser.findOne({ where: { username } });

    // Depuración: Registrar información del usuario y token
    console.log('Usuario obtenido:', user);
    if (user) {
      console.log('Token del usuario:', user.api_token);
    }

    if (!user || !user.api_token) {
      return res.status(401).json({ message: 'Token no encontrado' });
    }

    // Agregar el token al encabezado de autorización
    req.headers['authorization'] = `Bearer ${user.api_token}`;
    next();
  } catch (error) {
    console.error('Error al incluir el token:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = includeToken;