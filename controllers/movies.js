const Movies = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');
const { INVALID_DATA_ERROR_TEXT, ACCESS_ERROR_TEXT, MOVIE_ID_NOT_FOUND_ERROR_TEXT } = require('../utils/errorMessages');

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movies.create({ owner, ...req.body })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(INVALID_DATA_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;
  Movies.findById(_id)
    .orFail(() => {
      throw new ErrorNotFound(MOVIE_ID_NOT_FOUND_ERROR_TEXT);
    })
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        return next(new ErrorForbidden(ACCESS_ERROR_TEXT));
      }
      return String(movie._id);
    })
    .then((id) => Movies.findByIdAndRemove(id))
    .then((removedMovie) => res.send({ message: `Фильм '${removedMovie.nameRU}' удален` }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest(INVALID_DATA_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};
