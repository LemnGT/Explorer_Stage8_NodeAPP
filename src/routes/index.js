const { Router } = require("express");

const usersRoutes = require("./users.routes");
const movieNotes = require("./movie_notes.routes");
// const movieTags

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movie_notes", movieNotes);

module.exports = routes;
