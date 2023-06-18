const router = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, idValidator } = require('../validators/movie-validator');

router.post('/', createMovieValidator, createMovie);
router.get('/', getMovies);
router.delete('/:_id', idValidator, deleteMovie);

module.exports = router;
