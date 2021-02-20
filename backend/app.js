const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const cors = require('cors');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');

require('dotenv').config();

const { PORT = 8000 } = process.env;

const app = express();

mongoose.set('returnOriginal', false);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Массив разешённых доменов
const allowedCors = [
  'https://mesto-c4rdesigner.students.nomoreparties.spacek',
  'http://mesto-c4rdesigner.students.nomoreparties.space',
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  // eslint-disable-next-line max-len
  if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  }

  next();
});

app.options('*', cors());

app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use('/', auth, router);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorLogger); // подключаем логгер ошибок

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
