import mongoose from "mongoose";
import { IErrorCustom } from "types_interfaces/i-error-custom";
import validator from 'validator';
import bcrypt from 'bcrypt';
import { MongoError } from "mongodb";

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
  _id: string;
}

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<mongoose.Document<unknown, any, IUser>>
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто"
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь"
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: validator.isURL
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail
  },
  password: {
    required: true,
    type: String,
    select: false
  }
});

userSchema.post('save', {errorHandler: true}, (err, doc, next) => {
  if(err.name === 'MongoServerError' && (err as MongoError).code === 11000) {
    next(new InvalidDataError('Пользователь с таким email уже существует'))
  } else {
    next()
  }
})

userSchema.static('findUserByCredentials', function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new FailedAuthorization(USER_ERRORS_TEXT.FAILED_LOGIN)
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new FailedAuthorization(USER_ERRORS_TEXT.FAILED_LOGIN)
          }

          return user;
        });
    })
})


export default mongoose.model<IUser, UserModel>('user', userSchema);