import { RoleEnum } from '../enums/users/role.enum';
import { ITokenPair } from './token.interface';

export interface IUser {
  _id?: string;
  internal_id?: number;
  name: string;
  surname?: string;
  email: string;
  password: string;
  role?: RoleEnum;
  isActive?: boolean;
  createdAt?: Date;
}

export interface ILogin extends Pick<IUser, 'email' | 'password'> {}

export interface IUserResponse {
  user: Partial<IUser>;
  tokens: ITokenPair;
}
