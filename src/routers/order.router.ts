import { Router } from 'express';

import { orderController } from '../controllers/order.controller';
import { commonMiddleware } from '../middlewares/common.middleware';
import { OrderValidator } from '../validators/order.validator';

const router = Router();
router.get(
  '/',
  commonMiddleware.isQueryValid(OrderValidator.listQuery),
  orderController.getList,
);

export const orderRouter = router;
