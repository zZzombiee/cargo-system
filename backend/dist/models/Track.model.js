import mongoose, { Schema } from "mongoose";
const trackSchema = new Schema({
    orderNumber: {
        type: String,
        required: [true, "Order number is required"],
        unique: true,
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    status: {
        type: String,
        enum: ["Хүргэгдсэн", "Саатсан", "Хүргэлтэнд гарсан", "Бэлтгэгдэж байна"],
        default: "Бэлтгэгдэж байна",
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    weight: {
        type: Number,
        required: [true, "Weight is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // ✅ Reference
        required: true,
    },
}, { timestamps: true });
export default mongoose.model("Track", trackSchema);
