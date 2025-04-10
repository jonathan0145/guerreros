import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token de acceso' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_role)) {
      return res.status(403).json({ 
        message: 'No tienes permisos para realizar esta acción' 
      });
    }
    next();
  };
};