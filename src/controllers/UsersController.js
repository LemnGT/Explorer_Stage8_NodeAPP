const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password, avatar } = request.body;

    const database = await sqliteConnection();
    const checkUserEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserEmail) {
      throw new AppError("Email já cadastrado!");
    }

    const hashedPassword = await hash(password, 8);

    response.status(201).json({ name, email, password, icon });
  }

  async update(request, response) {
    const { name, email, password, avatar, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Email já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Necessário informar senha antiga");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    return response.status(200).json();
  }
}

module.exports = UsersController;
