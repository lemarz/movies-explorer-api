class ErrorNotAuth extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorNotAuth';
    this.statusCode = 401;
  }
}

module.exports = ErrorNotAuth;
