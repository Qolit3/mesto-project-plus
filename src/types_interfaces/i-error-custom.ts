import { Request } from "express"

export interface IErrorCustom extends Error {
  statusCode?: number
}