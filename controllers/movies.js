const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-err');
const { CREATED } = require('../consts/status-codes');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send({ movies });
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => Movie.findById(req.params._id)
  .orFail()
  .then((movie) => {
    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нельзя удалить чужой фильм!');
    }
    return movie;
  })
  .then((movie) => {
    Movie.findByIdAndDelete(movie._id)
      .orFail()
      .then(() => res.send({ message: 'Сохраненный фильм удален!' }))
      .catch(next);
  })
  .catch(next);

module.exports = { createMovie, getMovies, deleteMovie };
