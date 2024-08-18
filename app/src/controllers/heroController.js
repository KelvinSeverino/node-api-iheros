import { Hero, User } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

class HeroController {

    static async getAll (req, res, next) {
        try {
            const heros = await Hero.findAll();

            res.status(201).json({
                heros: heros
            });
        } catch (error) {
            next(error); //envia para o middleware de erros
        } 
    }

    static async findById (req, res, next) {
        try {
            const id = req.params.id;
            const hero = await Hero.findByPk(id);

            if(hero !== null){
                res.status(201).json({
                    hero: hero,
                });
            } else {
                next(new NotFound("ID do Hero não localizado"));           
            }
        } catch (error) {
            next(error);
        }
    }

    static async store (req, res, next) {   
        try {
            const { heroname, heroclass, latitude, longitude, userId } = req.body;

            const user = await User.findByPk(userId);
            if(user == null){
                next(new NotFound("ID do usuário inválido"));           
            }

            const newHero = await Hero.create({
                heroname: heroname,
                heroclass: heroclass,
                latitude: latitude,
                longitude: longitude,
                userId: userId,
            });
            
            res.status(201).json({
                message: "Hero cadastrado com sucesso!",
                hero: newHero,
            });
        } catch (error) {
            next(error);
        }   
    }    

    static async update (req, res, next) {
        try {
            const id = req.params.id;
            const { heroname, heroclass, latitude, longitude, userId } = req.body;

            const hero = await Hero.findByPk(id);
            if (!hero) {
                next(new NotFound("ID do Hero não localizado"));
            }

            await hero.update({
                heroname,
                heroclass,
                latitude,
                longitude,
                userId,
            });

            res.status(200).json({message: "Hero atualizado"});
        } catch (error) {
            next(error);
        }
    }

    static async delete (req, res, next) {
        try {
            const id = req.params.id;
            const hero = await Hero.findByPk(id);
            if (!hero) {
                next(new NotFound("ID do Hero não localizado"));
            }

            await hero.destroy();

            res.status(200).json({message: "Hero removido"});
        } catch (error) {
            next(error);
        }
    }    
};

export default HeroController;