const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();

const movieController = new MovieNotesController();

movieNotesRoutes.get("/:id", movieController.show);
movieNotesRoutes.post("/:user_id", movieController.create);
movieNotesRoutes.delete("/:id", movieController.delete);
movieNotesRoutes.get("/", movieController.index);

module.exports = movieNotesRoutes;
