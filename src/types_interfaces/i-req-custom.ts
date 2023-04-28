import { Request } from "express"

export interface IReqCustom extends Request {
  user?: {
    _id: string
  }
}