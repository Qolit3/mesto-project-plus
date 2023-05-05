import { createCard, deleteCard, getAllCards, putLike } from 'controllers/cards';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

const cardRouter = Router();

cardRouter.get('/', getAllCards)

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
  })
}), createCard)

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
  })
}), deleteCard)

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
  })
}), putLike)

cardRouter.delete('/:cardId/likes',  celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
  })
}), deleteCard)

export default cardRouter