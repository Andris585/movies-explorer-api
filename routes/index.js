const router = require('express').Router();
const validation = require('../middlewares/validation');
const usersRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');
const { RESOURCE_ERR } = require('../utils/errors/codes-and-messages');

router.post('/signup', validation.createUser, createUser);

router.post('/signin', validation.login, login);

router.post('/signout', logout);

router.use(auth);
router.use(usersRouter);
router.use(movieRouter);

// eslint-disable-next-line arrow-body-style
router.use('*', (next) => next(new NotFoundError(RESOURCE_ERR)));

module.exports = router;
