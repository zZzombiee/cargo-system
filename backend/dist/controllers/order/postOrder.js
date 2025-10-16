import { OrderModel } from "../../models/Order.model.js";
export const createOrder = async (req, res) => {
    const { orderNumber, weight, location, price, description } = req.body;
    try {
        const order = await new OrderModel({
            orderNumber,
            weight,
            location,
            price,
            description,
        }).save();
        res.status(200).json({ message: "Created new Order", order: order });
    }
    catch (error) {
        res.json({ message: error });
    }
};
