import { createUser, login } from 'controllers/users';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

const authRouter = Router();

authRouter.post('/signin', login)
authRouter.post('/singup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), createUser)

export default authRouter