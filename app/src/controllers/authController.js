import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Unauthorized from '../errors/Unauthorized.js';
import IncorrectRequest from '../errors/IncorrectRequest.js';

class AuthController {
    static async register (req, res, next) {
        try {
            const { username, email, password } = req.body;
            const newUser = await User.create({
                username: username,
                email: email,
                password: password,
            });
            
            res.status(201).json({
                message: "Usuário cadastrado com sucesso!",
                user: newUser,
            });
        } catch (error) {
            next(error); //envia para o middleware de erros
        }      
    }

    static async login (req, res, next) {
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
    }
};

export default AuthController;