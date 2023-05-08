import { NextFunction, Request, Response } from "express"
import card, { ICard } from "models/card"
import user from "models/user"
import { IReqCustom } from "types_interfaces/i-req-custom"

export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  card.find({})
    .populate(['owner', 'likes'])
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

export const createCard = (req: IReqCustom, res: Response, next: NextFunction) => {
  const { name, link} = req.body;

  user.findById(req.user?._id)
    .orFail()
    .then(user => {
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
    })
    .catch(next)
}

export const deleteCard = (req: IReqCustom, res: Response, next: NextFunction) => {
    card.findById(req.params.cardId)
    .orFail()
    .populate(["owner", "likes"])
    .then(cardOwner => {
      const { owner } = cardOwner

      if(owner._id === req.user?._id) {
        card.findByIdAndDelete(req.params.cardId)
          .orFail()
          .populate(["owner", "likes"])
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
      } else {
        throw new FailedAuthorization(USER_ERRORS_TEXT.NOT_OWNER)
      }
    })
    .catch(next)
}

export const putLike = (req: IReqCustom, res: Response, next: NextFunction) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
    )
    .orFail()
    .populate(["owner", "likes"])
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

export const deleteLike = (req: IReqCustom, res: Response, next: NextFunction) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true },
    )
    .orFail()
    .populate(["owner", "likes"])
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