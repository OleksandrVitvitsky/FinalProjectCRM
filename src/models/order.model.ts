import mongoose from 'mongoose';

import { IOrder } from '../interfaces/order.inreface';

const { Schema } = mongoose;

const orderSchema = new Schema({}, {});

export const Order = mongoose.model<IOrder>('orders', orderSchema);
