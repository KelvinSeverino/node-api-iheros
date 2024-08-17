import express from "express";
import UserController from "../controllers/userController.js";

const app = express();
app.use(express.json());

const routes = express.Router();

routes.get("/users", UserController.getAll)
routes.get("/users/:id", UserController.findById)
routes.post("/users", UserController.store)
routes.put("/users/:id", UserController.update)
routes.delete("/users/:id", UserController.delete)

export default routes;