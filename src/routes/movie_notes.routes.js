const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();

const movieController = new MovieNotesController();

movieNotesRoutes.post("/:user_id", movieController.create);
movieNotesRoutes.get("/:id", movieController.show);

module.exports = movieNotesRoutes;
