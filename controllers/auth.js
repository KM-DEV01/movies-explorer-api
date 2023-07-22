const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 3600000 * 24 * 7,
      });
      return res.status(200).send({
        message: 'Вы вошли в учетную запись!',
      });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    maxAge: 0,
  });
  return res.send({
    message: 'Вы вышли из учетной записи!',
  });
};

module.exports = { auth, logout };
