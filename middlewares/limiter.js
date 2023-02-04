const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  message: 'Превышено ограничение запросов, попробуйте снова позже.',
});

module.exports = limiter;
