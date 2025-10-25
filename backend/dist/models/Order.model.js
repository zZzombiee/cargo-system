import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema({
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
}, { timestamps: true });
export const OrderModel = mongoose.model("Order", OrderSchema);
