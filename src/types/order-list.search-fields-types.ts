import { OrderListSearchFieldsEnum } from '../enums/orders/order-list.search-fields.enum';

export const orderListSearchFieldTypes: Record<
  string,
  'string' | 'number' | 'date'
> = {
  [OrderListSearchFieldsEnum.NAME]: 'string',
  [OrderListSearchFieldsEnum.SURNAME]: 'string',
  [OrderListSearchFieldsEnum.AGE]: 'number',
  [OrderListSearchFieldsEnum.EMAIL]: 'string',
  [OrderListSearchFieldsEnum.PHONE]: 'string',
  [OrderListSearchFieldsEnum.COURSE]: 'string',
  [OrderListSearchFieldsEnum.COURSE_FORMAT]: 'string',
  [OrderListSearchFieldsEnum.COURSE_TYPE]: 'string',
  [OrderListSearchFieldsEnum.STATUS]: 'string',
  [OrderListSearchFieldsEnum.GROUPS]: 'string',
  [OrderListSearchFieldsEnum.START_DATE]: 'string',
  [OrderListSearchFieldsEnum.END_DATE]: 'string',
};
