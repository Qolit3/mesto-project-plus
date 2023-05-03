import { Router } from 'express';
import cardRouter from './card';
import userRouter from './user';

const allRoutes = Router();

allRoutes.use('/card', cardRouter);
allRoutes.use('/user', userRouter);

export default allRoutes;