import mongoose, { ObjectId, Schema } from "mongoose";

export interface Order {
  _id: string;
  status: "Ordered" | "PreparingToShip" | "Shipped" | "Delivered";
  userId: ObjectId;
  orderNumber: String;
  deliveryDate: Date;
  price: string;
  orderItem: Schema.Types.ObjectId[];
}

const OrderSchema = new Schema<Order>(
  {
    status: {
      type: String,
      enum: ["Ordered", "PreparingToShip", "Shipped", "Delivered"],
      default: "Ordered",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    orderNumber: { type: String },
    price: { type: String },
    orderItem: [{ type: Schema.Types.ObjectId, ref: "OrderDetails" }],
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
