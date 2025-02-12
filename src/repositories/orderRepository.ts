import { IOrder } from '../interfaces/order.inreface';
import { Order } from '../models/order.model';

class OrderRepository {
  public async getList(): Promise<IOrder[]> {
    return await Order.find();
  }
}

export const orderRepository = new OrderRepository();
