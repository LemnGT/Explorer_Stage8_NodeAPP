const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const userController = new UsersController();

// usersRoutes.post("/", userController.create);
// usersRoutes.put("/:id", userController.update);

usersRoutes.post("/", userController.create);

module.exports = usersRoutes;
