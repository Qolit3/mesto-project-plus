import { NextFunction, Request, Response } from "express"
import card from "models/card"
import mongoose from "mongoose"
import { IReqCustom } from "types_interfaces/i-req-custom"

export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  card.find({})
    .populate('user')
    .then(cards => {
      res.status(HTTP_CODES.OK).send(cards.map((card) => {
        const { likes, _id, name, link, owner, createdAt } = card
        return {
          likes: likes,
          _id: _id,
          name: name,
          link: link,
          owner: owner,
          createAt: createdAt
        }
      }))
    })
    .catch(next)
}

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link, user } = req.body;

  card.create({ name, link, owner: user })
    .then(card => {
      const { likes, _id, name, link, owner, createdAt } = card

      res.status(HTTP_CODES.OK).send({
          likes: likes,
          _id: _id,
          name: name,
          link: link,
          owner: owner,
          createAt: createdAt
        })
    })
    .catch(next)
}

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  card.findByIdAndDelete(req.params.cardId)
    .populate('user')
    .then(card => {
      if(!card) {
        throw new NotFoundError(CARD_ERRORS_TEXT.NOT_FOUND)
      }

      const { likes, _id, name, link, owner, createdAt } = card

      res.status(HTTP_CODES.OK).send({
        likes: likes,
        _id: _id,
        name: name,
        link: link,
        owner: owner,
        createAt: createdAt
      })
    })
    .catch(next)
}

export const putLike = (req: IReqCustom, res: Response, next: NextFunction) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
    )
    .populate('user')
    .then(card => {
      if(!card) {
        throw new NotFoundError(CARD_ERRORS_TEXT.NOT_FOUND)
      }

      const { likes, _id, name, link, owner, createdAt } = card

      res.status(HTTP_CODES.OK).send({
          likes: likes,
          _id: _id,
          name: name,
          link: link,
          owner: owner,
          createAt: createdAt
        })
    })
    .catch(next)
}

export const deleteLike = (req: IReqCustom, res: Response, next: NextFunction) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true },
    )
    .populate('user')
    .then(card => {
      if(!card) {
        throw new NotFoundError(CARD_ERRORS_TEXT.NOT_FOUND)
      }

      const { likes, _id, name, link, owner, createdAt } = card

      res.status(HTTP_CODES.OK).send({
        likes: likes,
        _id: _id,
        name: name,
        link: link,
        owner: owner,
        createAt: createdAt
      })
    })
    .catch(next)
}