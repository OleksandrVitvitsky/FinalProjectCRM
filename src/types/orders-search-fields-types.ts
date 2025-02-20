import { OrdersSearchFieldsEnum } from '../enums/orders/orders-search-fields.enum';

export const ordersSearchFieldTypes: Record<
  string,
  'string' | 'number' | 'date'
> = {
  [OrdersSearchFieldsEnum.NAME]: 'string',
  [OrdersSearchFieldsEnum.SURNAME]: 'string',
  [OrdersSearchFieldsEnum.AGE]: 'number',
  [OrdersSearchFieldsEnum.EMAIL]: 'string',
  [OrdersSearchFieldsEnum.PHONE]: 'string',
  [OrdersSearchFieldsEnum.COURSE]: 'string',
  [OrdersSearchFieldsEnum.COURSE_FORMAT]: 'string',
  [OrdersSearchFieldsEnum.COURSE_TYPE]: 'string',
  [OrdersSearchFieldsEnum.STATUS]: 'string',
  [OrdersSearchFieldsEnum.GROUPS]: 'string',
  [OrdersSearchFieldsEnum.START_CREATED_AT]: 'date',
  [OrdersSearchFieldsEnum.END_CREATED_AT]: 'date',
};
