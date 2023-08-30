const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { AUTHORIZATION_REQUIRED } = require('../utils/errors/codes-and-messages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, _, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
  }

  req.user = payload;

  return next();
};
