import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { IUser } from "./user";
import validator from 'validator';

export interface ICard {
  name: string,
  link: string,
  owner: IUser,
  likes: [IUser],
  createdAt: Date
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: validator.isURL
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: {
    type: [ObjectId],
    default: [],
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ICard>('card', cardSchema);