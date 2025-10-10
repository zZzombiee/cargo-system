import { Request, Response } from "express";
import { OrderModel } from "../../models/Order.model.js";

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
