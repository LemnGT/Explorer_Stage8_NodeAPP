const knex = require("../database/knex");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, movie_tags } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = movie_tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("movie_tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const movieNote = await knex("movie_notes").where({ id }).first();
    const movieTags = await knex("movie_tags")
      .where({ note_id: id })
      .orderBy("name");

    return response.json({ ...movieNote, movieTags });
  }
}

module.exports = MovieNotesController;
