import { CourseEnum } from '../enums/courses/course.enum';
import { CourseFormatEnum } from '../enums/courses/course.format.enum';
import { CourseTypeEnum } from '../enums/courses/course.type.enum';

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
  status?: string;
  createdAt?: Date;
}
