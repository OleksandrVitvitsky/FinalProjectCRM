import joi from 'joi';

import { SortEnum } from '../enums/common/sort.enum';
import { OrderListSearchFieldsEnum } from '../enums/orders/order-list.search-fields.enum';
import { OrderListSortByEnum } from '../enums/orders/order-list.sort-by.enum';
import { orderListSearchFieldTypes } from '../types/order-list.search-fields-types';

const fieldSchemas = {
  string: joi.string().trim(),
  number: joi.number(),
  date: joi.date(),
};

export class OrderValidator {
  public static listQuery = joi.object({
    limit: fieldSchemas.number.min(1).max(25).default(25),
    page: fieldSchemas.number.min(1).default(1),
    order: fieldSchemas.string
      .valid(...Object.values(SortEnum))
      .default(SortEnum.DESC),
    orderBy: fieldSchemas.string
      .valid(...Object.values(OrderListSortByEnum))
      .default(OrderListSortByEnum.CREATED_AT),
    ...(() => {
      const searchFields: Record<string, joi.Schema> = {};
      for (const field of Object.values(OrderListSearchFieldsEnum)) {
        const fieldType = orderListSearchFieldTypes[field];
        searchFields[
          `search${field.charAt(0).toUpperCase() + field.slice(1)}`
        ] = fieldSchemas[fieldType];
      }
      return searchFields;
    })(),
  });
}
