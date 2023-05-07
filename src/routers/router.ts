import { Router } from 'express';
import cardRouter from './card';
import userRouter from './user';

const allRoutes = Router();

allRoutes.use('/card', cardRouter);
allRoutes.use('/user', userRouter);
allRoutes.use((req, res, next) => {
  const err = new NotFoundError('Не могу найти эту страницу')
  next(err)
})

export default allRoutes;