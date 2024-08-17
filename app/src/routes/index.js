import express from "express";
import users from "./usersRoute.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200)
                                        .send("Seja bem-vindo a API IHeros"));

    app.use(
        express.json(), 
        users, 
    );
};

export default routes;