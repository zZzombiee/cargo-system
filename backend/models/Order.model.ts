import mongoose, { ObjectId, Schema } from "mongoose";

export interface Order {
  _id: string;
  status: "Ordered" | "PreparingToShip" | "Shipped" | "Delivered";
  userId: Number;
  orderNumber: String;
  deliveryDate: Date;
  price: string;
  orderItem: String[];
}

const OrderSchema = new Schema<Order>(
  {
    status: {
      type: String,
      enum: ["Ordered", "PreparingToShip", "Shipped", "Delivered"],
      default: "Ordered",
      required: true,
    },
    userId: { type: Number },
    orderNumber: { type: String },
    price: { type: String },
    orderItem: { type: [String] },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
