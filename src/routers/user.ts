import {
  getAllUsers, getClientsUser, getUserById, updateUserAvatar, updateUserInfo
} from 'controllers/users';
import { Router } from 'express'
import { celebrate, Joi } from 'celebrate';

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string()
  })
}), getUserById)

userRouter.get('/me', getClientsUser)

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200)
  })
}), updateUserInfo)

userRouter.patch('/me/avatar',  celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
  })
}),  updateUserAvatar)

export default userRouter