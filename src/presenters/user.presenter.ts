import { ITokenPair } from '../interfaces/token.interface';
import { IUser, IUserResponse } from '../interfaces/user.interface';

export class UserPresenter {
  public static toResponse(data: IUser): Partial<IUser> {
    return {
      _id: data._id,
      internal_id: data.internal_id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      isActive: data.isActive,
      createdAt: data.createdAt,
    };
  }

  public static toResponseList(dto: IUser, tokens: ITokenPair): IUserResponse {
    return {
      user: this.toResponse(dto),
      tokens,
    };
  }
}
