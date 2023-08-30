const { CONFLICT_ERR } = require('./codes-and-messages');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERR;
  }
}

module.exports = ConflictError;
