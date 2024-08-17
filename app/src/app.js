import routes from "./routes/index.js";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import routeNotFoundHandler from "./middlewares/routeNotFoundHandler.js";

const app = express();
routes(app);

app.use(routeNotFoundHandler)

app.use(errorHandler) //Midleware de erro

export default app;
