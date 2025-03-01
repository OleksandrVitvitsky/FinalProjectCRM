import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import { commonMiddleware } from '../middlewares/common.middleware';
import { UserValidator } from '../validators/user.validator';

const router = Router();

router.post(
  '/register',
  commonMiddleware.isBodyValid(UserValidator.createUser),
  authController.register,
);

export const authRouter = router;
