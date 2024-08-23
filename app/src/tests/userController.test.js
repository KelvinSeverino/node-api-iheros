import UserController from "../controllers/userController.js";
import { User } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

// Mocks
jest.mock('../models/index.js');

describe('UserController', () => {
  describe('getAll', () => {
    it('deve retornar todos os usuários', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
      User.findAll.mockResolvedValue(users);

      await UserController.getAll(req, res, next);

      expect(User.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ users });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro se a busca falhar', async () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      User.findAll.mockRejectedValue(new Error('Erro na busca'));

      await UserController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na busca'));
    });
  });

  describe('findById', () => {
    it('deve retornar um usuário por ID', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const user = { id: 1, username: 'user1' };
      User.findByPk.mockResolvedValue(user);

      await UserController.findById(req, res, next);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ user });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro NotFound se o usuário não for encontrado', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      User.findByPk.mockResolvedValue(null);

      await UserController.findById(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFound("ID do usuário não localizado"));
    });

    it('deve chamar next com um erro se a busca falhar', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      User.findByPk.mockRejectedValue(new Error('Erro na busca'));

      await UserController.findById(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na busca'));
    });
  });

  describe('store', () => {
    it('deve criar um novo usuário e retornar uma mensagem de sucesso', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const newUser = req.body;
      User.create.mockResolvedValue(newUser);

      await UserController.store(req, res, next);

      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário cadastrado com sucesso!",
        user: newUser,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro se a criação falhar', async () => {
      const req = { body: {} };
      const res = {};
      const next = jest.fn();

      User.create.mockRejectedValue(new Error('Erro na criação'));

      await UserController.store(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na criação'));
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário existente e retornar uma mensagem de sucesso', async () => {
      const req = {
        params: { id: 1 },
        body: {
          username: 'updateduser',
          email: 'updateduser@example.com',
          password: 'newpassword123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const user = {
        update: jest.fn().mockResolvedValue(true),
      };
      User.findByPk.mockResolvedValue(user);

      await UserController.update(req, res, next);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(user.update).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Usuário atualizado" });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro NotFound se o usuário não for encontrado', async () => {
      const req = {
        params: { id: 1 },
        body: {},
      };
      const res = {};
      const next = jest.fn();

      User.findByPk.mockResolvedValue(null);

      await UserController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFound("ID do usuário não localizado"));
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

      await UserController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na atualização'));
    });
  });

  describe('delete', () => {
    it('deve remover um usuário existente e retornar uma mensagem de sucesso', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const user = {
        destroy: jest.fn().mockResolvedValue(true),
      };
      User.findByPk.mockResolvedValue(user);

      await UserController.delete(req, res, next);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(user.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Usuário removido" });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro NotFound se o usuário não for encontrado', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      User.findByPk.mockResolvedValue(null);

      await UserController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFound("ID do usuário não localizado"));
    });

    it('deve chamar next com um erro se a remoção falhar', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      const user = { destroy: jest.fn().mockRejectedValue(new Error('Erro na remoção')) };
      User.findByPk.mockResolvedValue(user);

      await UserController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Erro na remoção'));
    });
  });
});
