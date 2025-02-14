import { NextFunction, Request, Response } from 'express';

import { IOrderListQuery } from '../interfaces/order.interface';
import { orderService } from '../services/orderService';

class OrderController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as IOrderListQuery;
      const result = await orderService.getList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
export const orderController = new OrderController();
