import { SortEnum } from '../enums/common/sort.enum';
import { CourseEnum } from '../enums/courses/course.enum';
import { CourseFormatEnum } from '../enums/courses/course.format.enum';
import { CourseTypeEnum } from '../enums/courses/course.type.enum';
import { OrderStatusEnum } from '../enums/orders/order.status.enum';
import { OrderListSortByEnum } from '../enums/orders/order-list.sort-by.enum';

export interface IOrder {
  _id: string;
  name: string;
  surname?: string;
  email?: string;
  phone?: string;
  age?: number;
  course: CourseEnum;
  course_format?: CourseFormatEnum;
  course_type?: CourseTypeEnum;
  sum?: number;
  already_paid: boolean;
  status?: OrderStatusEnum;
  created_at?: Date;
}

export interface IOrderListQuery {
  limit?: number;
  page?: number;
  order?: SortEnum;
  orderBy?: OrderListSortByEnum;
  searchName?: string;
  searchSurname?: string;
  searchEmail?: string;
  searchPhone?: string;
  searchAge?: number;
  searchCourse?: CourseEnum;
  searchCourse_format?: CourseFormatEnum;
  searchCourse_type?: CourseTypeEnum;
  searchStatus?: OrderStatusEnum;
  searchGroups?: string;
  searchStart_date?: string;
  searchEnd_date?: string;
}

export interface IOrderResponseList extends IOrderListQuery {
  data: IOrder[];
  total: number;
}
