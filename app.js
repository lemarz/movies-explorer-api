const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb');

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.clear();
  console.log('Сервер запущен...');
});
