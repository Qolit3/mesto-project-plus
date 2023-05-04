import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    required: true,
    type: ObjectId,
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

export default mongoose.model('card', cardSchema);