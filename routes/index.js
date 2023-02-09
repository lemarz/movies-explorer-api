const routes = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../middlewares/joiValidator');
const auth = require('../middlewares/auth');
const notFound = require('../middlewares/notFound');

routes.post('/signup', createUserValidator, createUser);
routes.post('/signin', loginValidator, login);
routes.use(auth);
routes.use('/users', require('./users'));
routes.use('/movies', require('./movies'));

routes.use(notFound);

module.exports = routes;
