const Movies = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');

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
        next(new ErrorBadRequest('Переданы некорректные данные'));
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
      throw new ErrorNotFound('Фильм с указанным _id не найден.');
    })
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        return next(new ErrorForbidden('Вы не можете удалять чужие фильмы.'));
      }
      return String(movie._id);
    })
    .then((id) => Movies.findByIdAndRemove(id))
    .then((removedMovie) => res.send({ message: `Фильм '${removedMovie.nameRU}' удален` }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};
