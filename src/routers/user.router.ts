import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import { commonMiddleware } from '../middlewares/common.middleware';

const router = Router();

// router.post(
//   "/users",
//   commonMiddleware.isBodyValid(UserValidator.createUser),
//   authController.signUp,
// );

router.post(
  '/registerAdmin',
  commonMiddleware.createDtoAdmin,
  authController.register,
);

export const userRouter = router;
