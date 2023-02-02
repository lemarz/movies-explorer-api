const ErrorNotFound = require('../errors/ErrorNotFound');

const notFound = (req, res, next) => {
  next(new ErrorNotFound('Данный путь не найден'));
};

module.exports = notFound;
