import express from "express";
import auth from "./authRoute.js";
import users from "./usersRoute.js";
import heros from "./herosRoute.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200)
                                        .send("Seja bem-vindo a API iHeros"));

    app.use(
        express.json(), 
        auth,
        users, 
        heros, 
    );
};

export default routes;