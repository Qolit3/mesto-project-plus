import {
  getAllUsers, getClientsUser, getUserById, updateUserAvatar, updateUserInfo
} from 'controllers/users';
import { Router } from 'express'
import { celebrate, Joi } from 'celebrate';

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24)
  })
}), getUserById)

userRouter.get('/me', getClientsUser)

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required()
  })
}), updateUserInfo)

userRouter.patch('/me/avatar',  celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
  })
}),  updateUserAvatar)

export default userRouter