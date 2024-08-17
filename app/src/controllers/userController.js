import { User } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

class UserController {

    static async getAll (req, res, next) {
        try {
            const users = await User.findAll();

            res.status(201).json({
                users: users
            });
        } catch (error) {
            next(error); //envia para o middleware de erros
        } 
    }

    static async findById (req, res, next) { 
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);

            if(user !== null){
                res.status(201).json({
                    user: user,
                });
            } else {
                next(new NotFound("ID do usuário não localizado"));           
            }
        } catch (error) {
            next(error); //envia para o middleware de erros
        }   
    }

    static async store (req, res, next) {
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

    static async update (req, res, next) {  
        try {
            const id = req.params.id;
            const { username, email, password } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                next(new NotFound("ID do usuário não localizado"));
            }

            // Atualizar os dados do usuário
            await user.update({
                username,
                email,
                password,
            });

            res.status(200).json({message: "Usuário atualizado"});
        } catch (error) {
            next(error); //envia para o middleware de erros
        }   
    }

    static async delete (req, res, next) {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);
            if (!user) {
                next(new NotFound("ID do usuário não localizado"));
            }

            await user.destroy();

            res.status(200).json({message: "Usuário removido"});
        } catch (error) {
            next(error); //envia para o middleware de erros
        }  
    }    
};

export default UserController;