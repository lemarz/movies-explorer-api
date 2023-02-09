const rateLimit = require('express-rate-limit');
const { REQUEST_LIMIT_REACHED_ERROR_TEXT } = require('../utils/errorMessages');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  message: REQUEST_LIMIT_REACHED_ERROR_TEXT,
});

module.exports = limiter;
