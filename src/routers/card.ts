import { createCard, deleteCard, getAllCards, putLike } from 'controllers/cards';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

const cardRouter = Router();

cardRouter.get('/', getAllCards)

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
  })
}), createCard)

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
  })
}), deleteCard)

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
  })
}), putLike)

cardRouter.delete('/:cardId/likes',  celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
  })
}), deleteCard)

export default cardRouter