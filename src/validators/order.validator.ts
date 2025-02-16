import joi from 'joi';

import { SortEnum } from '../enums/common/sort.enum';
import { OrdersSearchFieldsEnum } from '../enums/orders/orders.search-fields.enum';
import { OrdersSortByEnum } from '../enums/orders/orders.sort-by.enum';
import { ordersSearchFieldTypes } from '../types/orders.search-fields-types';

const fieldSchemas = {
  string: joi.string().trim(),
  number: joi.number(),
  date: joi.date(),
};
export class OrderValidator {
  public static listQuery = joi
    .object({
      limit: fieldSchemas.number.min(1).max(25).default(25),
      page: fieldSchemas.number.min(1).default(1),
      order: fieldSchemas.string
        .valid(...Object.values(SortEnum))
        .default(SortEnum.DESC),
      orderBy: fieldSchemas.string
        .valid(...Object.values(OrdersSortByEnum))
        .default(OrdersSortByEnum.CREATED_AT),
      ...(() => {
        const searchFields: Record<string, joi.Schema> = {};
        for (const field of Object.values(OrdersSearchFieldsEnum)) {
          const fieldType = ordersSearchFieldTypes[field];
          searchFields[
            `search${field.charAt(0).toUpperCase() + field.slice(1)}`
          ] = fieldSchemas[fieldType];
        }
        return searchFields;
      })(),
      searchStart_created_at: fieldSchemas.date,
      searchEnd_created_at: fieldSchemas.date,
    })
    .custom((value, helpers) => {
      if (value.searchStart_created_at && value.searchEnd_created_at) {
        const startDate = new Date(value.searchStart_created_at);
        const endDate = new Date(value.searchEnd_created_at);

        if (startDate > endDate) {
          return helpers.error('specified_period.invalid');
        }
      }
      return value;
    })
    .messages({
      'specified_period.invalid': `"searchStart_created_at" must be less than or equal to "searchEnd_created_at"`,
    });
}
