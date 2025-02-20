import { ApiError } from '../errors/api-error';
import { ITokenPair } from '../interfaces/token.interface';
import { IUser } from '../interfaces/user.interface';
import { UserPresenter } from '../presenters/user.presenter';
import { tokenRepository } from '../repositories/token.repository';
import { userRepository } from '../repositories/user.repository';
import { passwordService } from './password.service';
import { tokenService } from './token.service';

class AuthService {
  public async register(
    dto: IUser,
  ): Promise<{ user: Partial<IUser>; tokens: ITokenPair }> {
    await this.isEmailExist(dto.email);

    const password = await passwordService.hashPassword(dto.password);

    const user = await userRepository.create({ ...dto, password });

    const tokens = await tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    // const actionToken = await tokenService.generateActionToken(
    //   { userId: user._id, role: user.role },
    //   ActionTokenTypeEnum.VERIFY_EMAIL,
    // );
    // await actionTokenRepository.create({
    //   actionToken,
    //   type: ActionTokenTypeEnum.VERIFY_EMAIL,
    //   _userId: user._id,
    // });
    // await emailService.sendEmail(EmailTypeEnum.WELCOME, dto.email, {
    //   name: dto.name,
    //   actionToken,
    //   frontUrl: configs.FRONTEND_URL,
    // });

    // const [orders, total] = await orderRepository.getList(query);
    return UserPresenter.toResponseList(user, tokens);
    //return { user, tokens };
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError(
        `The user with email - ${email} already exists in the system`,
        409,
      );
    }
  }
}

export const authService = new AuthService();
