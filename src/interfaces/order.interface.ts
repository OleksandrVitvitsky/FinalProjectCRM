import { SortEnum } from '../enums/common/sort.enum';
import { CourseEnum } from '../enums/courses/course.enum';
import { CourseFormatEnum } from '../enums/courses/course.format.enum';
import { CourseTypeEnum } from '../enums/courses/course.type.enum';
import { OrdersSortByEnum } from '../enums/orders/orders.sort-by.enum';
import { OrdersStatusEnum } from '../enums/orders/orders.status.enum';

export interface IOrder {
  _id: string;
  internal_id: number;
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
  status?: OrdersStatusEnum;
  created_at?: Date;
}

export interface IOrderListQuery {
  limit?: number;
  page?: number;
  sort?: SortEnum;
  sortBy?: OrdersSortByEnum;
  searchName?: string;
  searchSurname?: string;
  searchEmail?: string;
  searchPhone?: string;
  searchAge?: number;
  searchCourse?: CourseEnum;
  searchCourse_format?: CourseFormatEnum;
  searchCourse_type?: CourseTypeEnum;
  searchStatus?: OrdersStatusEnum;
  searchGroups?: string;
  searchStart_created_at?: string;
  searchEnd_created_at?: string;
}

export interface IOrderResponseList extends IOrderListQuery {
  data: IOrder[];
  total: number;
}
