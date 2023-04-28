import { createCard, deleteCard, getAllCards, putLike } from 'controllers/cards';
import { Router } from 'express';

const cardRouter = Router();

cardRouter.get('/', getAllCards)

cardRouter.post('/', createCard)

cardRouter.delete('/:cardId', deleteCard)

cardRouter.put('/:cardId/likes', putLike)

cardRouter.delete('/:cardId/likes', deleteCard)

export default cardRouter