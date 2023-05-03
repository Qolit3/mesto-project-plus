import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import allRoutes from 'routers/router';
import { IReqCustom } from 'types_interfaces/i-req-custom';


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

app.use('/', allRoutes)

app.use((req, res, next) => {
  res.status(HTTP_CODES.NOT_FOUND).send("Не могу найти страницу, по этому запросу")
})

// Я не понял в каком месте мне использовать instanceof. Точнее я не понял,
// попадают ли в этот мидлвар ошибки БД. Если да, то наверное, тут можно их и обработать
// через instanceof

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = HTTP_CODES.SERVER_ERROR, message = 'Ошибка сервера' } = err;

  res.status(statusCode).send({ message: message})
})


app.listen(3000)