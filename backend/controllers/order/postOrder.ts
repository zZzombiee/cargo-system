import { Request, Response } from "express";
import { OrderModel } from "../../models/Order.model.js";

export const createOrder = async (req: Request, res: Response) => {
  const { userId, orderNumber, deliveryDate, price, orderItems } = req.body;

  console.log(req.body);

  try {
    const order = await new OrderModel({
      userId,
      orderNumber,
      deliveryDate,
      price,
      orderItems,
    }).save();

    res.status(200).json({ message: "Created new Order", order: order });
  } catch (error) {
    res.json({ message: error });
  }
};
