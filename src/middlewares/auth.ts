import { NextFunction, Response } from "express";
import { IReqCustom } from "types_interfaces/i-req-custom";
import jwt from 'jsonwebtoken';

export default (req: IReqCustom, res: Response, next: NextFunction) => {
  const { authorization } = req.headers ;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new FailedAuthorization(USER_ERRORS_TEXT.FAILED_AUTHORIZATION))
  }
  if(authorization) {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token,'key')
    } catch(err) {
      return next(new FailedAuthorization(USER_ERRORS_TEXT.FAILED_AUTHORIZATION))
    }
    if(req.user) {
      req.user._id = payload;
    }
    next()
  }
};