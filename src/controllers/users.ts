import { NextFunction, Request, Response } from "express"
import user from "models/user"
import { IReqCustom } from "types_interfaces/i-req-custom"
import { updateUser } from "util/update-user-func"


export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  user.find({})
    .then(users => {
      res.status(HTTP_CODES.OK).send({ users: users })
    })
    .catch(next)
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  user.findById(req.params.id)
    .orFail()
    .then(user => {
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

  updateUser(req, res, next, { name, about })
}

export const updateUserAvatar = (req: IReqCustom, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  updateUser(req, res, next, { avatar })
}