import { Request, Response } from "express";
import { OrderModel } from "../../models/Order.model.js";

export const createOrder = async (req: Request, res: Response) => {
  const {
    orderNumber,
    senderName,
    receiverName,
    weight,
    location,
    price,
    productName,
  } = req.body;

  try {
    const order = await new OrderModel({
      orderNumber,
      senderName,
      receiverName,
      weight,
      location,
      price,
      productName,
    }).save();

    res.status(200).json({ message: "Created new Order", order: order });
  } catch (error) {
    res.json({ message: error });
  }
};
