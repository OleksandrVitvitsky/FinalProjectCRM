import mongoose from 'mongoose';

import { CourseEnum } from '../enums/courses/course.enum';
import { CourseFormatEnum } from '../enums/courses/course-format.enum';
import { CourseTypeEnum } from '../enums/courses/course-type.enum';
import { OrderStatusEnum } from '../enums/orders/orders-status.enum';
import { IOrder } from '../interfaces/order.interface';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    internal_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    age: { type: Number, required: false },
    course: { type: String, enum: CourseEnum, required: true },
    course_format: { type: String, enum: CourseFormatEnum, required: false },
    course_type: { type: String, enum: CourseTypeEnum, required: false },
    sum: { type: Number, required: false },
    already_paid: { type: Boolean, required: true, default: false },
    created_at: { type: Date, required: false },
    utm: { type: String, required: false },
    msg: { type: String, required: false },
    status: { type: String, enum: OrderStatusEnum, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Order = mongoose.model<IOrder>('orders', orderSchema);
