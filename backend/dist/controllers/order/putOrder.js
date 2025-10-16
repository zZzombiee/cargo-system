import { OrderModel } from "../../models/Order.model.js";
const putOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status, location } = req.body;
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { ...(status && { status }), ...(location && { location }) }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        return res.json({
            message: "Order updated successfully",
            order: updatedOrder,
        });
    }
    catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: "Failed to update order" });
    }
};
export default putOrder;
