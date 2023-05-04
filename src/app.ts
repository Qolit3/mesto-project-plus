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

mongoose.Error

app.use('/', allRoutes)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = HTTP_CODES.SERVER_ERROR, message = 'Ошибка сервера' } = err;
  if(err instanceof mongoose.Error.ValidationError) {
    res.status(HTTP_CODES.INVALID_DATA).send({ message: 'Данные не соответсвуют схеме' })
  } else if(err instanceof mongoose.Error.CastError) {
    res.status(HTTP_CODES.INVALID_DATA).send({ message: 'Невалидный ID'})
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(HTTP_CODES.NOT_FOUND).send({ message: 'Документ не найдены'})
  } else {
    res.status(statusCode).send({ message: message})
  }

})


app.listen(3000)