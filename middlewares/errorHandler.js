const { SERVER_FAULT } = require('../utils/errors/codes-and-messages');

const errorHandler = (err, _, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_FAULT
        : message,
    });

  next();
};

module.exports = errorHandler;
