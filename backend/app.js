const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { rateLimit } = require('express-rate-limit');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('./middlewares/cors');
const { regExp } = require('./constants/constants');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const pageNotFound = require('./routes/pageNotFound');

const auth = require('./middlewares/auth');
const errorServer = require('./middlewares/errors');

const { postUser, login } = require('./controllers/users');

const { PORT = 3000, URL = 'mongodb://127.0.0.1/mestodb' } = process.env;

const app = express();

require('dotenv').config();

mongoose.connect(URL);

app.use(express.json());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regExp),
    }),
  }),
  postUser,
);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('/', pageNotFound);

app.use(errorLogger);

app.use(errors());
app.use(errorServer);

app.listen(PORT);
