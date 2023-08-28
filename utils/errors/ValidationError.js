const { VALIDATION_ERR } = require('./codes-and-messages');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERR;
  }
}

module.exports = ValidationError;
