const CORS_OPTIONS = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',

    'http://movies-finder.nomoredomainsclub.ru',
    'http://lastone.nomoredomains.club',
    'http://api.movies-finder.nomoredomainsclub.ru',
    'http://api.lastone.nomoredomains.club',

    'https://movies-finder.nomoredomainsclub.ru',
    'https://lastone.nomoredomains.club',
    'https://api.movies-finder.nomoredomainsclub.ru',
    'https://api.lastone.nomoredomains.club',
  ],
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

const {
  PORT = 3000,
  NODE_ENV = 'development',
  DATABASE_ADDRESS = 'mongodb://0.0.0.0:27017/bitfilmsdb',
  JWT_SECRET = 'dev-secret-key',
} = process.env;

module.exports = {
  CORS_OPTIONS,
  PORT,
  NODE_ENV,
  DATABASE_ADDRESS,
  JWT_SECRET,
};
