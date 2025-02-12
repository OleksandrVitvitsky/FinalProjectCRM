import { IOrder } from '../interfaces/order.inreface';
import { orderRepository } from '../repositories/orderRepository';

class OrderService {
  public async getList(): Promise<IOrder[]> {
    return await orderRepository.getList();
  }
}

export const orderService = new OrderService();
