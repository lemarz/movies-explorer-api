const jwt = require('jsonwebtoken');
const ErrorNotAuth = require('../errors/ErrorNotAuth');

const { JWT_SECRET = 'your-secret-key' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorNotAuth('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ErrorNotAuth('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = auth;
