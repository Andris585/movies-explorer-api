const Movie = require('../models/movies');
const {
  CREATED,
  MOVIE_NOT_FOUND,
  ACCESS_DENIED,
} = require('../utils/errors/codes-and-messages');

const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({ owner: { $eq: req.user._id } })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const { _id } = req.user;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: _id,
    })
    .then((movie) => res.status(CREATED).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params._id)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(MOVIE_NOT_FOUND));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(ACCESS_DENIED));
      }
      Movie
        .deleteOne()
        .then((status) => res.send(status))
        .catch((err) => next(err));
    })
    .catch(next);
};
