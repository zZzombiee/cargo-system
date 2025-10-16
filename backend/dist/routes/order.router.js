import express from "express";
import { getOrders } from "../controllers/order/getOrders.js";
import { createOrder } from "../controllers/order/postOrder.js";
import putOrder from "../controllers/order/putOrder.js";
import GetOrder from "../controllers/order/getOrder.js";
export const orderRouter = express.Router();
orderRouter
    .get("/", getOrders)
    .post("/", createOrder)
    .patch("/:orderId", putOrder)
    .post("/order", GetOrder);
