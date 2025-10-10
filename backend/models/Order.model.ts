import mongoose, { ObjectId, Schema } from "mongoose";

export interface Order {
  _id: string;
  orderNumber: string;
  productName: string[];
  senderName: string;
  receiverName: string;
  weight: number;
  status: "Ordered" | "PreparingToShip" | "Shipped" | "Delivered";
  // userId: Number;
  location: string;
  price: number;
}

const OrderSchema = new Schema<Order>(
  {
    status: {
      type: String,
      enum: ["Ordered", "PreparingToShip", "Shipped", "Delivered"],
      default: "Ordered",
      required: true,
    },
    // userId: { type: Number },
    orderNumber: { type: String },
    senderName: { type: String },
    receiverName: { type: String },
    weight: { type: Number },
    location: { type: String },
    price: { type: Number },
    productName: { type: [String] },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
