const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauth-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Значение должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.static('findUserByCredentials', function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((match) => {
        if (!match) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }
        return user;
      }));
});

module.exports = mongoose.model('user', userSchema);
