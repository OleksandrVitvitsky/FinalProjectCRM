import {
  IOrderListQuery,
  IOrderResponseList,
} from '../interfaces/order.interface';
import { OrderPresenter } from '../presenters/order.presenter';
import { orderRepository } from '../repositories/orderRepository';

class OrderService {
  public async getList(query: IOrderListQuery): Promise<IOrderResponseList> {
    const [orders, total] = await orderRepository.getList(query);
    return OrderPresenter.toResponseList(orders, total, query);
  }
}

export const orderService = new OrderService();
