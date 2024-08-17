import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Unauthorized from '../errors/Unauthorized.js';
import IncorrectRequest from '../errors/IncorrectRequest.js';

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        
        if (!user || !(await user.validatePassword(password))) {
            next(new Unauthorized('Credenciais inválidas'));
        }

        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h', } // Token expira em 1 hora
        );

        res.json({ 
            auth: true,
            token: token 
        });
    } catch (error) {
        console.log(error)
        next(new IncorrectRequest());
    }
};

export default { login };