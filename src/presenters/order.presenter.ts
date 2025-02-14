import {
  IOrder,
  IOrderListQuery,
  IOrderResponseList,
} from '../interfaces/order.interface';

export class OrderPresenter {
  public static toResponse(data: IOrder): IOrder {
    return {
      _id: data._id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      age: data.age,
      course: data.course,
      course_format: data.course_format,
      course_type: data.course_type,
      sum: data.sum,
      already_paid: data.already_paid,
      status: data.status,
      created_at: data.created_at,
    };
  }

  public static toResponseList(
    data: IOrder[],
    total: number,
    query: IOrderListQuery,
  ): IOrderResponseList {
    return {
      data: data.map((item) => this.toResponse(item)),
      total,
      ...query,
    };
  }
}
