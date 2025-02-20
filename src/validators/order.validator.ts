import joi from 'joi';

import { SortEnum } from '../enums/common/sort.enum';
import { OrdersSearchFieldsEnum } from '../enums/orders/orders-search-fields.enum';
import { OrdersSortByEnum } from '../enums/orders/orders-sort-by.enum';
import { ordersSearchFieldTypes } from '../types/orders-search-fields-types';

export class OrderValidator {
  private static fieldSchemas = {
    string: joi.string().trim(),
    number: joi.number(),
    date: joi.date(),
  };
  private static limit = this.fieldSchemas.number.min(1).max(25).default(25);
  private static page = this.fieldSchemas.number.min(1).default(1);
  private static searchStart_created_at = this.fieldSchemas.date;
  private static searchEnd_created_at = this.fieldSchemas.date;

  private static sort = this.fieldSchemas.string
    .valid(...Object.values(SortEnum))
    .default(SortEnum.DESC);
  private static sortBy = this.fieldSchemas.string
    .valid(...Object.values(OrdersSortByEnum))
    .default(OrdersSortByEnum.CREATED_AT);

  private static validateSearchFieldType = () => {
    const searchFields: Record<string, joi.Schema> = {};
    for (const field of Object.values(OrdersSearchFieldsEnum)) {
      const fieldType = ordersSearchFieldTypes[field];
      searchFields[`search${field.charAt(0).toUpperCase() + field.slice(1)}`] =
        this.fieldSchemas[fieldType];
    }
    return searchFields;
  };

  public static listQuery = joi
    .object({
      limit: this.limit, //fieldSchemas.number.min(1).max(25).default(25),
      page: this.page, //fieldSchemas.number.min(1).default(1),
      sort: this.sort,
      sortBy: this.sortBy,
      searchStart_created_at: this.searchStart_created_at,
      searchEnd_created_at: this.searchEnd_created_at,
      ...this.validateSearchFieldType(),
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
