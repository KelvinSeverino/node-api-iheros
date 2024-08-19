import express from "express";
import BattleController from "../controllers/battleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const app = express();
app.use(express.json());

const routes = express.Router();

routes.get("/battles/realtime", authMiddleware, BattleController.getBattlesRealTime)
routes.get("/battles/finished", authMiddleware, BattleController.getBattlesFinished)

export default routes;