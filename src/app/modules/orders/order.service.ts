import { ProductModel } from '../stationery/stationery.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  if (result) {
    const updatePoduct = await ProductModel.findOneAndUpdate({ _id: order.product }, { $inc: { quantity: -order.quantity } }, { new: true });
    console.log(updatePoduct)
    if (updatePoduct?.quantity as number <= 0) {
      await ProductModel.updateOne({ _id: order.product }, { inStock: false });
    }

  }
  return result;
};
const calculateRevenue = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: "null",
        totalRevenue: { $sum: '$totalPrice' }
      }
    },
    {
      $project: {
        _id: 0
      }
    }
  ]);
  return result;
}

export const OrderServices = {
  createOrderIntoDB,
  calculateRevenue
};