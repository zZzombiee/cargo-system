import { OrderModel } from "../../models/Order.model.js";
export const getOrders = async (_req, res) => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 });
        res.status(200).json({ orders: orders });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
export const getOrdersByDate = async (req, res) => {
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
            return res.status(200).json({ message: "No orders found in this range" });
        }
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
