import { model, Schema, Types } from 'mongoose';
import validator from 'validator';
import { Order } from './order.interface';
const orderSchema = new Schema<Order>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid',
      },
    },

    product: {
      type: Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },

    totalPrice: {
      type: Number,
      required: true,
      min: [1, 'Total price cannot be negative'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrderModel = model<Order>('Order', orderSchema);