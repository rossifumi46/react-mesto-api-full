const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, getMyProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

const { urlValidator } = require('../utils');

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

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidator, 'URL validation').required(),
  }),
}), updateAvatar);

module.exports = usersRouter;
