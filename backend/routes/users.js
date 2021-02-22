const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, getMyProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getMyProfile);
usersRouter.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
}), getUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

const method = (value, helpers) => {
  // Throw an error (will be replaced with 'any.custom' error)
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9._]+\.[a-zA-Z]+[a-zA-z\d-._~:/?#[\]@!$&'()*+,;=]*/i;

  if (!regex.test(value)) {
    return helpers.message('Неверный URL');
  }

  // Return the value unchanged
  return value;
};

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(method, 'URL validation').required(),
  }),
}), updateAvatar);

module.exports = usersRouter;
