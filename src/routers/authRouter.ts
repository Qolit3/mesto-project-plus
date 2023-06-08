import { createUser, login } from 'controllers/users';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

const authRouter = Router();

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
}), login)
authRouter.post('/singup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
}), createUser)

export default authRouter