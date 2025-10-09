import { Request, Response } from "express";
import { OrderModel } from "../../models/Order.model";

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.json({ orders });
  } catch (error) {
    res.json({ message: error });
  }
};
