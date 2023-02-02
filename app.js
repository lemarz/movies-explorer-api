const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb');
app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  /* eslint-disable */
  console.clear();
  console.log('Сервер запущен...');
});
