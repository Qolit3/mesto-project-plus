import express, { NextFunction, Request, Response } from 'express';
import {  errors } from 'celebrate';
import { errorLogger, requestLogger } from 'middlewares/logger';
import mongoose from 'mongoose';
import allRoutes from 'routers/router';
import auth from 'middlewares/auth';
import authRouter from 'routers/authRouter';

//Простите, не успеваю зарефакторить комментарии "можно лучше". Сделаю уже после сдачи.
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger)

app.use('/', allRoutes)

app.use(auth)

app.use('/', authRouter)

app.use(errorLogger)

app.use(errors())

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = HTTP_CODES.SERVER_ERROR, message = 'Ошибка сервера' } = err;
  err instanceof mongoose.Error.ValidationError
    ? res.status(HTTP_CODES.INVALID_DATA).send({ message: 'Данные не соответсвуют схеме' })
    : err instanceof mongoose.Error.CastError
      ? res.status(HTTP_CODES.INVALID_DATA).send({ message: 'Невалидный ID' })
      : err instanceof mongoose.Error.DocumentNotFoundError
        ? res.status(HTTP_CODES.NOT_FOUND).send({ message: 'Документ не найдены' })
        : res.status(statusCode).send({ message: message })
})


app.listen(3000)