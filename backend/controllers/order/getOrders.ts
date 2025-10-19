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

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order: order });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getOrdersByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;

  try {
    const orders = await OrderModel.find({ status: status });
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getOrdersByLocation = async (req: Request, res: Response) => {
  const { location } = req.params;

  try {
    const orders = await OrderModel.find({ location: location });
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getOrdersByDate = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Start and end dates are required" });
  }

  try {
    // Normalize dates to include full days
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const orders = await OrderModel.find({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found in this range" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders by date:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
