import { RoleEnum } from '../enums/users/role.enum';
import { IUser } from './user.interface';

export interface IToken {
  _id?: string;
  accessToken: string;
  refreshToken: string;
  _userId: string | IUser;
}

export interface ITokenPayload {
  userId: string;
  role: RoleEnum;
}

export interface ITokenPair
  extends Pick<IToken, 'accessToken' | 'refreshToken'> {}
