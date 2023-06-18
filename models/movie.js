const mongoose = require('mongoose');
const { linkExp, ruNameExp, enNameExp } = require('../consts/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => linkExp.test(v),
      message: 'Некорректный URL изображения!',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => linkExp.test(v),
      message: 'Некорректный URL трейлера!',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => linkExp.test(v),
      message: 'Некорректный URL постера!',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    validate: {
      validator: (v) => ruNameExp.test(v),
      message: 'Название должно быть на русском',
    },
  },
  nameEN: {
    type: String,
    validate: {
      validator: (v) => enNameExp.test(v),
      message: 'Название должно быть на английском',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
