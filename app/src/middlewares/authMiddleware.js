import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized.js';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Espera o token no formato "Bearer TOKEN"

    if (!token) {
        next(new Unauthorized());
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            next(new Unauthorized('Token inválido'));
        }

        req.user = decoded;
        next();
    });
};

export default authMiddleware;