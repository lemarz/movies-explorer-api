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
  const movieId = req.params._id;
  Movies.findById(movieId)
    .orFail(() => {
      throw new ErrorNotFound(MOVIE_ID_NOT_FOUND_ERROR_TEXT);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ErrorForbidden(ACCESS_ERROR_TEXT);
      }
      return movie.remove();
    })
    .then((removedMovie) => res.send({ message: `Фильм '${removedMovie.nameRU}' удален` }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest(INVALID_DATA_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};
