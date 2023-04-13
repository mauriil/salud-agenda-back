import { HttpException } from '@nestjs/common';
import * as mongoose from 'mongoose';

const handleE11000 = function (err, res, next) {
  if (err.code === 11000) {
    throw new HttpException('User already exists', 400);
  }
};

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, collection: 'users' },
)
  .post('save', handleE11000)
  .index({ email: 1 }, { unique: true });

export interface User extends mongoose.Document {
  id: string;
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
