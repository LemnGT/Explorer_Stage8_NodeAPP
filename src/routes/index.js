const { Router } = require("express");

const usersRoutes = require("./users.routes");
// const movieNotes
// const movieTags

const routes = Router();

routes.use("/users", usersRoutes);

module.exports = routes;
