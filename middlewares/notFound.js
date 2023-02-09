const ErrorNotFound = require('../errors/ErrorNotFound');
const { URL_NOT_FOUND_ERROR_TEXT } = require('../utils/errorMessages');

const notFound = (req, res, next) => {
  next(new ErrorNotFound(URL_NOT_FOUND_ERROR_TEXT));
};

module.exports = notFound;
