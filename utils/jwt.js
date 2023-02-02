const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'your-secret-key' } = process.env;

module.exports.getJwtToken = (id) => jwt.sign(
  { _id: id },
  JWT_SECRET,
  { expiresIn: '7d' },
);
