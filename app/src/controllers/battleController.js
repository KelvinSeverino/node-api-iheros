import { BattleLog, Hero } from "../models/index.js";

class BattleController {
    static async getBattlesRealTime (req, res, next) {
        try {
            const battles = await BattleLog.findAll({
                attributes: ['id','monstername', 'monsterrank', 'monsterlatitude', 'monsterlongitude', 'createdAt'],
                include: {
                    model: Hero,
                    attributes: ['id', 'heroname', 'heroclass', 'latitude', 'longitude',],
                },
                where: {inbattle: true},
                order: [
                    ['createdAt', 'DESC'],
                ]
            });

            res.status(201).json({
                battles: battles
            });
        } catch (error) {
            next(error); //envia para o middleware de erros
        } 
    }

    static async getBattlesFinished (req, res, next) {
        try {
            
            const battles = await BattleLog.findAll({
                attributes: ['monstername', 'monsterrank', 'monsterlatitude', 'monsterlongitude', 'duration', 'createdAt'],
                include: {
                    model: Hero,
                    attributes: ['id', 'heroname', 'heroclass', 'latitude', 'longitude',],
                },
                where: {inbattle: false}
            });

            res.status(201).json({
                battles: battles
            });
        } catch (error) {
            next(error); //envia para o middleware de erros
        } 
    }
};

export default BattleController;