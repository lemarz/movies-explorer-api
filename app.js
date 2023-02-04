const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const notFound = require('./middlewares/notFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUserValidator, loginValidator } = require('./middlewares/joiValidator');
const limiter = require('./middlewares/limiter');
const { CORS_OPTIONS } = require('./utils/config');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb');
app.use(requestLogger);
app.use(limiter);

app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginValidator, login);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(notFound);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  /* eslint-disable */
  console.clear();
  console.log('Сервер запущен...');
});
