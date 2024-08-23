import HeroController from "../controllers/heroController.js";
import { Hero, User } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

// Mocks
jest.mock('../models/index.js');

describe('HeroController', () => {
  describe('getAll', () => {
    it('deve retornar todos os heróis', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const heros = [{ id: 1, heroname: 'hero1' }, { id: 2, heroname: 'hero2' }];
      Hero.findAll.mockResolvedValue(heros);

      await HeroController.getAll(req, res, next);

      expect(Hero.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ heros });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro se a busca falhar', async () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      Hero.findAll.mockRejectedValue(new Error('Erro na busca'));

      await HeroController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na busca'));
    });
  });

  describe('findById', () => {
    it('deve retornar um herói por ID', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const hero = { id: 1, heroname: 'hero1' };
      Hero.findByPk.mockResolvedValue(hero);

      await HeroController.findById(req, res, next);

      expect(Hero.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ hero });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro NotFound se o herói não for encontrado', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      Hero.findByPk.mockResolvedValue(null);

      await HeroController.findById(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFound("ID do Hero não localizado"));
    });

    it('deve chamar next com um erro se a busca falhar', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      Hero.findByPk.mockRejectedValue(new Error('Erro na busca'));

      await HeroController.findById(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na busca'));
    });
  });

  describe('store', () => {
    it('deve criar um novo herói e retornar uma mensagem de sucesso', async () => {
      const req = {
        body: {
          heroname: 'testhero',
          heroclass: 'warrior',
          latitude: 10,
          longitude: 20,
          userId: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const user = { id: 1 };
      const newHero = req.body;
      User.findByPk.mockResolvedValue(user);
      Hero.create.mockResolvedValue(newHero);

      await HeroController.store(req, res, next);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(Hero.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Hero cadastrado com sucesso!",
        hero: newHero,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro NotFound se o usuário não for encontrado', async () => {
      const req = {
        body: {
          heroname: 'testhero',
          heroclass: 'warrior',
          latitude: 10,
          longitude: 20,
          userId: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      User.findByPk.mockResolvedValue(null);

      await HeroController.store(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFound("ID do usuário inválido"));
    });

    it('deve chamar next com um erro se a criação falhar', async () => {
      const req = { body: {} };
      const res = {};
      const next = jest.fn();

      const user = { id: 1 };
      User.findByPk.mockResolvedValue(user);
      Hero.create.mockRejectedValue(new Error('Erro na criação'));

      await HeroController.store(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na criação'));
    });
  });

  describe('update', () => {
    it('deve atualizar um herói existente e retornar uma mensagem de sucesso', async () => {
      const req = {
        params: { id: 1 },
        body: {
          heroname: 'updatedhero',
          heroclass: 'mage',
          latitude: 30,
          longitude: 40,
          userId: 2,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const hero = {
        update: jest.fn().mockResolvedValue(true),
      };
      Hero.findByPk.mockResolvedValue(hero);

      await HeroController.update(req, res, next);

      expect(Hero.findByPk).toHaveBeenCalledWith(1);
      expect(hero.update).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Hero atualizado" });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro NotFound se o herói não for encontrado', async () => {
      const req = {
        params: { id: 1 },
        body: {},
      };
      const res = {};
      const next = jest.fn();

      Hero.findByPk.mockResolvedValue(null);

      await HeroController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFound("ID do Hero não localizado"));
    });

    it('deve chamar next com um erro se a atualização falhar', async () => {
        const req = {
          params: { id: 1 },
          body: {},
        };
        const res = {};
        const next = jest.fn();
  
        User.findByPk.mockResolvedValue({});
        User.findByPk.mockRejectedValue(new Error('Erro na atualização'));
  
        await HeroController.update(req, res, next);
  
        expect(next).toHaveBeenCalledWith(new Error('Erro na atualização'));
    });
  });

  describe('delete', () => {
    it('deve remover um herói existente e retornar uma mensagem de sucesso', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const hero = {
        destroy: jest.fn().mockResolvedValue(true),
      };
      Hero.findByPk.mockResolvedValue(hero);

      await HeroController.delete(req, res, next);

      expect(Hero.findByPk).toHaveBeenCalledWith(1);
      expect(hero.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Hero removido" });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro NotFound se o herói não for encontrado', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      Hero.findByPk.mockResolvedValue(null);

      await HeroController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFound("ID do Hero não localizado"));
    });

    it('deve chamar next com um erro se a remoção falhar', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      const hero = { destroy: jest.fn().mockRejectedValue(new Error('Erro na remoção')) };
      Hero.findByPk.mockResolvedValue(hero);

      await HeroController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na remoção'));
    });
  });
});
