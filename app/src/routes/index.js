import express from "express";
import cors from "cors";
import auth from "./authRoute.js";
import users from "./usersRoute.js";
import heros from "./herosRoute.js";
import battles from "./battlesRoute.js";

const routes = (app) => {
    app.use(cors({
        origin: 'http://localhost:3000', // URL do seu aplicativo React
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    app.route("/").get((req, res) => res.status(200)
                                        .send("Seja bem-vindo a API iHeros"));

    app.use(
        express.json(), 
        auth,
        users, 
        heros, 
        battles,
    );
};

export default routes;