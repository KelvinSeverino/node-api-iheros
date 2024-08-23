import BattleController from "../controllers/battleController.js";
import { BattleLog, Hero } from "../models/index.js";

// Mocks
jest.mock('../models/index.js');

describe('BattleController', () => {
  describe('getBattlesRealTime', () => {
    it('deve retornar todas as batalhas em tempo real', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const battles = [
        { id: 1, monstername: 'monster1', monsterrank: 'A', monsterlatitude: 10, monsterlongitude: 20, createdAt: new Date() },
        { id: 2, monstername: 'monster2', monsterrank: 'B', monsterlatitude: 30, monsterlongitude: 40, createdAt: new Date() }
      ];
      BattleLog.findAll.mockResolvedValue(battles);

      await BattleController.getBattlesRealTime(req, res, next);

      expect(BattleLog.findAll).toHaveBeenCalledWith({
        attributes: ['id', 'monstername', 'monsterrank', 'monsterlatitude', 'monsterlongitude', 'createdAt'],
        include: {
          model: Hero,
          attributes: ['id', 'heroname', 'heroclass', 'latitude', 'longitude'],
        },
        where: { inbattle: true },
        order: [['createdAt', 'DESC']],
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ battles });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro se a busca falhar', async () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      BattleLog.findAll.mockRejectedValue(new Error('Erro na busca'));

      await BattleController.getBattlesRealTime(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na busca'));
    });
  });

  describe('getBattlesFinished', () => {
    it('deve retornar todas as batalhas finalizadas', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const battles = [
        { monstername: 'monster1', monsterrank: 'A', monsterlatitude: 10, monsterlongitude: 20, duration: 5, createdAt: new Date() },
        { monstername: 'monster2', monsterrank: 'B', monsterlatitude: 30, monsterlongitude: 40, duration: 10, createdAt: new Date() }
      ];
      BattleLog.findAll.mockResolvedValue(battles);

      await BattleController.getBattlesFinished(req, res, next);

      expect(BattleLog.findAll).toHaveBeenCalledWith({
        attributes: ['monstername', 'monsterrank', 'monsterlatitude', 'monsterlongitude', 'duration', 'createdAt'],
        include: {
          model: Hero,
          attributes: ['id', 'heroname', 'heroclass', 'latitude', 'longitude'],
        },
        where: { inbattle: false },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ battles });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro se a busca falhar', async () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      BattleLog.findAll.mockRejectedValue(new Error('Erro na busca'));

      await BattleController.getBattlesFinished(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na busca'));
    });
  });
});
