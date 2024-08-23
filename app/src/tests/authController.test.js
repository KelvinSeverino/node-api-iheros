import AuthController from "../controllers/authController.js";
import User from '../models/User.js';
import Unauthorized from '../errors/Unauthorized.js';
import IncorrectRequest from '../errors/IncorrectRequest.js';
import jwt from 'jsonwebtoken';

// Mocks
jest.mock('../models/User.js');
jest.mock('jsonwebtoken');

describe('AuthController', () => {
  describe('register', () => {
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

      // Mock do método User.create
      User.create.mockResolvedValue(req.body);

      await AuthController.register(req, res, next);

      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário cadastrado com sucesso!",
        user: req.body,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com um erro se o registro falhar', async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      User.create.mockRejectedValue(new Error('Registration failed'));

      await AuthController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Registration failed'));
    });
  });

  describe('login', () => {
    it('deve retornar um token para credenciais válidas', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();

      const user = {
        id: 1,
        username: 'testuser',
        validatePassword: jest.fn().mockResolvedValue(true),
      };

      User.findOne.mockResolvedValue(user);
      jwt.sign.mockReturnValue('mockedToken');

      await AuthController.login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
      expect(user.validatePassword).toHaveBeenCalledWith('password123');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      expect(res.json).toHaveBeenCalledWith({
        auth: true,
        token: 'mockedToken',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next com erro Unauthorized se as credenciais forem inválidas', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'wrongpassword',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const user = {
        validatePassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(user);

      await AuthController.login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
      expect(user.validatePassword).toHaveBeenCalledWith('wrongpassword');
      expect(next).toHaveBeenCalledWith(new Unauthorized('Credenciais inválidas'));
    });
  });
});
