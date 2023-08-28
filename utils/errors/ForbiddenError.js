const { FORBIDDEN_ERR } = require('./codes-and-messages');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERR;
  }
}

module.exports = ForbiddenError;
