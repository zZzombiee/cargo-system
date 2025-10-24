import mongoose, { ObjectId, Schema } from "mongoose";

export interface Order {
  _id: ObjectId;
  orderNumber: string;
  weight: number;
  status:
    | "Бүртгүүлсэн"
    | "Эрээнд ирсэн"
    | "Монголд ирсэн"
    | "Саатсан"
    | "Цуцалсан"
    | "Хүргэгдсэн";
  location: "Улаанбаатар" | "Эрээн" | "Замын-Үүд" | "Хятад";
  price: number;
  discription: string;
  userId: ObjectId;
}

const OrderSchema = new Schema<Order>(
  {
    status: {
      type: String,
      enum: [
        "Бүртгүүлсэн",
        "Эрээнд ирсэн",
        "Монголд ирсэн",
        "Хүргэгдсэн",
        "Саатсан",
        "Цуцалсан",
      ],
      default: "Бүртгүүлсэн",
      required: true,
    },
    discription: { type: String },
    orderNumber: { type: String },
    weight: { type: Number },
    location: {
      type: String,
      enum: ["Улаанбаатар", "Эрээн", "Замын-Үүд", "Хятад"],
      default: "Хятад",
      required: true,
    },
    price: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
