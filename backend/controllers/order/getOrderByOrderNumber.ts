import { Request, Response } from "express";
import { OrderModel } from "../../models/Order.model.js";

const GetOrderByOrderNumber = async (req: Request, res: Response) => {
  const { orderNumber } = req.body;

  try {
    const orders = await OrderModel.find({
      orderNumber: { $regex: orderNumber, $options: "i" }, // 'i' = case-insensitive
    }).sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default GetOrderByOrderNumber;
