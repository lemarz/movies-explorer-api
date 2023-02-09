const bcrypt = require('bcrypt');
const Users = require('../models/user');
const { getJwtToken } = require('../utils/jwt');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorUserExists = require('../errors/ErrorUserExists');
const ErrorNotFound = require('../errors/ErrorNotFound');
const { INVALID_DATA_ERROR_TEXT, USER_ID_NOT_FOUND_ERROR_TEXT, NOT_UNIQUE_EMAIL_ERROR_TEXT } = require('../utils/errorMessages');

module.exports.getUserMe = (req, res, next) => {
  const { _id } = req.user;
  Users.findById(_id)
    .orFail(() => {
      throw new ErrorNotFound(USER_ID_NOT_FOUND_ERROR_TEXT);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest(INVALID_DATA_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new ErrorNotFound(USER_ID_NOT_FOUND_ERROR_TEXT);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(INVALID_DATA_ERROR_TEXT));
      } else if (err.code === 11000) {
        next(new ErrorUserExists(NOT_UNIQUE_EMAIL_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, name } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => Users.create({ name, email, password: hash }))
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(INVALID_DATA_ERROR_TEXT));
      } else if (err.code === 11000) {
        next(new ErrorUserExists(NOT_UNIQUE_EMAIL_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);
      res.send({ message: 'Авторизация успешна', token });
    })
    .catch((err) => next(err));
};
