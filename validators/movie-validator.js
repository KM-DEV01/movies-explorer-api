const { celebrate, Joi } = require('celebrate');
const { linkExp, ruNameExp, enNameExp } = require('../consts/regex');

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(linkExp).required(),
    trailerLink: Joi.string().pattern(linkExp).required(),
    thumbnail: Joi.string().pattern(linkExp).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().pattern(ruNameExp).required(),
    nameEN: Joi.string().pattern(enNameExp).required(),
  }),
});

const idValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

module.exports = { createMovieValidator, idValidator };
