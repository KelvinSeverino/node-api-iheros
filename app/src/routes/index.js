import express from "express";
import auth from "./authRoute.js";
import users from "./usersRoute.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200)
                                        .send("Seja bem-vindo a API iHeroes"));

    app.use(
        express.json(), 
        auth,
        users, 
    );
};

export default routes;