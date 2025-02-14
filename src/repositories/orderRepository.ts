import { SortOrder } from 'mongoose';

import { OrderListSearchFieldsEnum } from '../enums/orders/order-list.search-fields.enum';
import { OrderListSortByEnum } from '../enums/orders/order-list.sort-by.enum';
import { IOrder, IOrderListQuery } from '../interfaces/order.interface';
import { Order } from '../models/order.model';
import { orderListSearchFieldTypes } from '../types/order-list.search-fields-types';

class OrderRepository {
  public async getList(query: IOrderListQuery): Promise<[IOrder[], number]> {
    const filterObj: any = {};

    const andConditions = [];

    for (const field of Object.values(OrderListSearchFieldsEnum)) {
      const searchValue =
        query[`search${field.charAt(0).toUpperCase() + field.slice(1)}`];
      if (searchValue) {
        const fieldType = orderListSearchFieldTypes[field];

        if (fieldType === 'number') {
          andConditions.push({ [field]: Number(searchValue) });
        } else if (fieldType === 'string') {
          andConditions.push({
            [field]: { $regex: searchValue, $options: 'i' },
          });
        }
      }
    }

    if (query.searchStart_date && query.searchEnd_date) {
      andConditions.push({
        created_at: {
          $gte: new Date(query.searchStart_date),
          $lte: new Date(query.searchEnd_date),
        },
      });
    } else if (query.searchStart_date) {
      andConditions.push({
        created_at: {
          $gte: new Date(query.searchStart_date),
        },
      });
    } else if (query.searchEnd_date) {
      andConditions.push({
        created_at: {
          $lte: new Date(query.searchEnd_date),
        },
      });
    }

    if (andConditions.length > 0) {
      filterObj.$and = andConditions;
    }

    const sortObj: { [key: string]: SortOrder } = {};
    if (
      query.orderBy &&
      Object.values(OrderListSortByEnum).includes(query.orderBy)
    ) {
      sortObj[query.orderBy] = query.order;
    } else {
      throw new Error('Invalid or missing orderBy');
    }

    const skip = (query.page - 1) * query.limit;
    return await Promise.all([
      Order.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      Order.countDocuments(filterObj),
    ]);
  }
}

export const orderRepository = new OrderRepository();
