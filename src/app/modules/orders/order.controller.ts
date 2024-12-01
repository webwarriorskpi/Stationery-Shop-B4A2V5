import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { ProductServices } from '../stationery/stationery.service';
import { Order } from './order.interface';



const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: Order = req.body;
    const isExist = await ProductServices.getSingleProductFromDB(orderData?.product as unknown as string)
    if (!isExist?.inStock || isExist.quantity < orderData.quantity) {
      res.status(400).json({
        message: "Product out of quantity",
        status: false,
      });
    } else {
      const result = await OrderServices.createOrderIntoDB(orderData);
      res.status(200).json({
        message: 'Order created successfully',
        status: true,
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
      status: false,
      err
    });
  }
};
const Revenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data:  totalRevenue ,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Server error while calculating revenue',
      status: false,
      error: error.message,
    });
  }
};

export const orderController = {
  createOrder, Revenue

}