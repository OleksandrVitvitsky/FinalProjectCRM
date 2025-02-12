import { Router } from 'express';

import { orderController } from '../controllers/orderController';

const router = Router();
router.get('/', orderController.getList);

export const orderRouter = router;
