const router = require('express').Router();
const validation = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', validation.createMovie, createMovie);

router.delete('/movies/:_id', validation.deleteMovie, deleteMovie);

module.exports = router;
