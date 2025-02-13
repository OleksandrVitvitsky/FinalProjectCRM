import joi from 'joi';

import { UserListOrderByEnum } from '../enums/order-list-order-by.enum';
import { SortEnum } from '../enums/sort.enum';

export class OrderValidator {
  public static listQuery = joi.object({
    limit: joi.number().min(1).max(25).default(25),
    page: joi.number().min(1).default(1),
    search: joi.string().trim(),
    order: joi
      .string()
      .valid(...Object.values(SortEnum))
      .default(SortEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(UserListOrderByEnum))
      .default(UserListOrderByEnum.NAME),
  });
}
