import { NextFunction, Request, Response } from 'express';

import { IUser } from '../interfaces/user.interface';
import { authService } from '../services/auth.service';

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.register(dto);

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
