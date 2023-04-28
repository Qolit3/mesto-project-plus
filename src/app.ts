import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/user'
import { IReqCustom } from 'types_interfaces/i-req-custom';
import cardRouter from 'routers/card';

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const reqCustom: IReqCustom = req;

  reqCustom.user = {
    _id: '6448691bbd9dbc3d2ef7d11d'
  };

  next();
});

app.use('/users', userRouter)
app.use('/cards', cardRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = HTTP_CODES.SERVER_ERROR, message = 'Ошибка сервера' } = err;

  res.status(statusCode).send({ message: message})
})


app.listen(3000)