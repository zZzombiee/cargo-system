import mongoose, { ObjectId, Schema } from "mongoose";

export interface Order {
  _id: ObjectId;
  orderNumber: string;
  weight: number;
  status: "Хятад агуулахад" | "Замд явж байна" | "Хүлээн авсан" | "Саатсан";
  location: "Улаанбаатар" | "Эрээн" | "Замын-Үүд" | "Хятад";
  price: number;
}

const OrderSchema = new Schema<Order>(
  {
    status: {
      type: String,
      enum: [
        "Хятад агуулахад",
        "Замд явж байна",
        "Хүлээн авсан",
        "Хүргэгдсэн",
        "Саатсан",
      ],
      default: "Хятад агуулахад",
      required: true,
    },
    orderNumber: { type: String },
    weight: { type: Number },
    location: {
      type: String,
      enum: ["Улаанбаатар", "Эрээн", "Замын-Үүд", "Хятад"],
      default: "Хятад",
      required: true,
    },
    price: { type: Number },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
