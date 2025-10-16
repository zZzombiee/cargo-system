import { Request, Response } from "express";
import { OrderModel } from "../../models/Order.model.js";

const GetOrder = async (req: Request, res: Response) => {
  const { orderNumber } = req.body;

  try {
    const order = await OrderModel.findOne({ orderNumber });

    if (!order) {
      return res.status(200).json({ message: "захиалгын дугаар олдсонгүй" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default GetOrder;
