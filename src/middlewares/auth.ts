import { NextFunction, Response } from "express";
import { IReqCustom } from "types_interfaces/i-req-custom";
import jwt from 'jsonwebtoken';

export default (req: IReqCustom, res: Response, next: NextFunction) => {
  const { authorization } = req.headers ;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: USER_ERRORS_TEXT.FAILED_AUTHORIZATION });
  }
  if(authorization) {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token,'key')
    } catch(err) {
      return res.status(HTTP_CODES.UNAUTHORIZED).send({ message: USER_ERRORS_TEXT.FAILED_AUTHORIZATION })
    }
    if(req.user) {
      req.user._id = payload;
    }

    next()
  }
};