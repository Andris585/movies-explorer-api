const { UNAUTHORIZED_ERR } = require('./codes-and-messages');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERR;
  }
}

module.exports = UnauthorizedError;
