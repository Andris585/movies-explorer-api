const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK,
  CREATED,
  USER_NOT_FOUND,
  USER_EXISTS,
} = require('../utils/errors/codes-and-messages');

const ConflictError = require('../utils/errors/ConflictError');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.cookie('token', token, {
        maxAge: 36000000, httpOnly: true, credentials: true, domain: '*', path: '/', sameSite: 'none', secure: true,
      }).status(OK).send({ message: 'Вы авторизовались' });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User
    .findById(req.user._id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, email, password: hash,
      },
    ))
    .then((user) => {
      res
        .status(CREATED)
        .send({
          data: {
            name: user.name,
            email: user.email,
            _id: user._id,
          },
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(USER_EXISTS));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.logout = (_, res) => {
  res.status(OK).clearCookie('token').send({ message: 'cookie cleared' });
};
