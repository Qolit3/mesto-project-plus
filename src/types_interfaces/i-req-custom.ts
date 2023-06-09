import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface IReqCustom extends Request {
  user?: { _id: string | JwtPayload }
}