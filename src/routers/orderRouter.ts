import { Router } from 'express';

import { orderController } from '../controllers/orderController';
import { commonMiddleware } from '../middlewares/common.middleware';

const router = Router();
router.get(
  '/',
  commonMiddleware.isQueryValid(OrderValidator.listQuery),
  orderController.getList,
);

export const orderRouter = router;
