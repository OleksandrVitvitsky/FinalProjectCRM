import mongoose from 'mongoose';

import { RoleEnum } from '../enums/users/role.enum';
import { IUser } from '../interfaces/user.interface';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    internal_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: RoleEnum,
      required: true,
      default: RoleEnum.MANAGER,
    },
    isActive: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = mongoose.model<IUser>('users', userSchema);
