import { NextFunction, Response } from "express";
import user from "models/user";
import { IReqCustom } from "types_interfaces/i-req-custom";

export const updateUser = (req: IReqCustom, res: Response, next: NextFunction, info: info) => {
  user.findByIdAndUpdate(req.user?._id, info, { new: true, runValidators: true })
    .orFail()
    .then(user => {
      if(user) {
        const { name, about, avatar, _id } = user;

      res.status(HTTP_CODES.OK).send({
        name: name,
        about: about,
        avatar: avatar,
        _id: _id
      })
      }
    })
    .catch(next)
}