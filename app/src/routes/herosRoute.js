import express from "express";
import HeroController from "../controllers/heroController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const app = express();
app.use(express.json());

const routes = express.Router();

routes.get("/heros", authMiddleware, HeroController.getAll)
routes.get("/heros/:id", authMiddleware, HeroController.findById)
routes.post("/heros", authMiddleware, HeroController.store)
routes.put("/heros/:id", authMiddleware, HeroController.update)
routes.delete("/heros/:id", authMiddleware, HeroController.delete)

export default routes;