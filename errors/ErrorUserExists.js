class ErrorUserExists extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorUserExists';
    this.statusCode = 409;
  }
}

module.exports = ErrorUserExists;
