import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserAvatar,
  updateUserInfo } from 'controllers/users';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById)

userRouter.post('/', createUser)

userRouter.patch('/me', updateUserInfo)

userRouter.patch('/me/avatar', updateUserAvatar)

export default userRouter