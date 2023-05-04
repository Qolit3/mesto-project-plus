import { Router } from 'express';
import cardRouter from './card';
import userRouter from './user';

const allRoutes = Router();

allRoutes.use('/card', cardRouter);
allRoutes.use('/user', userRouter);
allRoutes.use((req, res, next) => {
  res.status(HTTP_CODES.NOT_FOUND).send("Не могу найти страницу, по этому запросу")
})

export default allRoutes;