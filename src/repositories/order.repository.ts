import { SortOrder } from 'mongoose';

import { OrdersSearchFieldsEnum } from '../enums/orders/orders-search-fields.enum';
import { OrdersSortByEnum } from '../enums/orders/orders-sort-by.enum';
import { IOrder, IOrderListQuery } from '../interfaces/order.interface';
import { Order } from '../models/order.model';
import { ordersSearchFieldTypes } from '../types/orders-search-fields-types';

class OrderRepository {
  public async getList(query: IOrderListQuery): Promise<[IOrder[], number]> {
    const filterObj: any = {};

    const andConditions = [];

    for (const field of Object.values(OrdersSearchFieldsEnum)) {
      const searchValue =
        query[`search${field.charAt(0).toUpperCase() + field.slice(1)}`];

      if (searchValue) {
        const fieldType = ordersSearchFieldTypes[field];

        if (fieldType === 'number') {
          andConditions.push({ [field]: Number(searchValue) });
        } else if (fieldType === 'string') {
          andConditions.push({
            [field]: { $regex: searchValue, $options: 'i' },
          });
        }
      }
    }

    if (query.searchStart_created_at && query.searchEnd_created_at) {
      andConditions.push({
        created_at: {
          $gte: new Date(query.searchStart_created_at),
          $lte: new Date(query.searchEnd_created_at),
        },
      });
    } else if (query.searchStart_created_at) {
      andConditions.push({
        created_at: {
          $gte: new Date(query.searchStart_created_at),
        },
      });
    } else if (query.searchEnd_created_at) {
      andConditions.push({
        created_at: {
          $lte: new Date(query.searchEnd_created_at),
        },
      });
    }

    if (andConditions.length > 0) {
      filterObj.$and = andConditions;
    }

    const sortObj: { [key: string]: SortOrder } = {};
    if (
      query.sortBy &&
      Object.values(OrdersSortByEnum).includes(query.sortBy)
    ) {
      sortObj[query.sortBy] = query.sort;
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
