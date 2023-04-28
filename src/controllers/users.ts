import { NextFunction, Request, Response } from "express"
import user from "models/user"
import { IReqCustom } from "types_interfaces/i-req-custom"


export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  user.find({})
    .then(users => {
      if(!users) {
        throw new NotFoundError(USER_ERRORS_TEXT.NOT_FOUND)
      }

      res.status(HTTP_CODES.OK).send({ users: users })
    })
    .catch(next)
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  user.findById(req.params.id)
    .then(user => {
      if(!user) {
        throw new NotFoundError(USER_ERRORS_TEXT.NOT_FOUND)
      }

      const { name, about, avatar, _id } = user;

      res.status(HTTP_CODES.OK).send({
        name: name,
        about: about,
        avatar: avatar,
        _id: _id
      })
    })
    .catch(next)
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then(user => {
      if(!user) {
        throw new InvalidDataError(USER_ERRORS_TEXT.INVALID_DATA)
      }

      const { name, about, avatar, _id } = user;

      res.status(HTTP_CODES.OK).send({
          name: name,
          about: about,
          avatar: avatar,
          _id: _id
        })
    })
    .catch(next)
}

export const updateUserInfo = (req: IReqCustom, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  user.findByIdAndUpdate(req.user?._id, { name, about }, { new: true })
    .then(user => {
      if(!user) {
        throw new InvalidDataError(USER_ERRORS_TEXT.INVALID_DATA)
      }

      const { name, about, avatar, _id } = user;

      res.status(HTTP_CODES.OK).send({
        name: name,
        about: about,
        avatar: avatar,
        _id: _id
      })
    })
    .catch(next)
}

export const updateUserAvatar = (req: IReqCustom, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(req.user?._id, { avatar }, { new: true })
    .then(user => {
      if(!user) {
        throw new InvalidDataError(USER_ERRORS_TEXT.INVALID_DATA)
      }

      const { name, about, avatar, _id } = user;

      res.status(HTTP_CODES.OK).send({
        name: name,
        about: about,
        avatar: avatar,
        _id: _id
      })
    })
    .catch(next)
}