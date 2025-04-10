// authMiddleware.js
import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado' });
            }
            return res.status(403).json({ error: 'Token inválido' });
        }
        
        // Agregar la información del usuario al objeto request
        req.user = user;
        next();
    });
}