import { NextFunction, Request, Response } from 'express';

import { orderService } from '../services/orderService';

class OrderController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
export const orderController = new OrderController();
