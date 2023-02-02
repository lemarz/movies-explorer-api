const bcrypt = require('bcrypt');
const Users = require('../models/user');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorUserExists = require('../errors/ErrorUserExists');
const { getJwtToken } = require('../utils/jwt');

module.exports.createUser = (req, res, next) => {
  const { email, name } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => Users.create({ name, email, password: hash }))
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные.'));
      } else if (err.code === 11000) {
        next(new ErrorUserExists('Такой пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).send({ message: 'Авторизация успешна', token });
    })
    .catch((err) => next(err));
};
