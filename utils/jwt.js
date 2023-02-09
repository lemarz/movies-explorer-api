const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

module.exports.getJwtToken = (id) => jwt.sign(
  { _id: id },
  JWT_SECRET,
  { expiresIn: '7d' },
);
