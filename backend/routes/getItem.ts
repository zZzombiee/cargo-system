import express from "express";
import { getOrders } from "../controllers/order/getOrders";

export const orderRouter = express.Router();

orderRouter.get("/orders", getOrders);
