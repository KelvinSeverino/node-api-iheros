import express from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const app = express();
app.use(express.json());

const routes = express.Router();

routes.get("/users", authMiddleware, UserController.getAll)
routes.get("/users/:id", authMiddleware, UserController.findById)
routes.post("/users", authMiddleware, UserController.store)
routes.put("/users/:id", authMiddleware, UserController.update)
routes.delete("/users/:id", authMiddleware, UserController.delete)

export default routes;