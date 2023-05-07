import { NextFunction, Request, Response } from "express"
import user from "models/user"
import { IReqCustom } from "types_interfaces/i-req-custom"
import { updateUser } from "util/update-user-func"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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

export const getClientsUser = (req: IReqCustom, res: Response, next: NextFunction) => {
  return user.findById(req.user?._id)
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
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => user.create({ name, about, avatar, email, password: hash })
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
    )
}

export const updateUserInfo = (req: IReqCustom, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  updateUser(req, res, next, { name, about })
}

export const updateUserAvatar = (req: IReqCustom, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  updateUser(req, res, next, { avatar })
}

export const login = (req: IReqCustom, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id}, 'key', { expiresIn: '7d'})

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true
      }).end();
    })
    .catch(next)
};