import mongoose, { Schema } from "mongoose";
const trackSchema = new Schema({
    trackingNumber: {
        type: String,
        required: [true, "Tracking number is required"],
        unique: true,
    },
    location: {
        type: String,
        default: "Хятад", // 👈 default байршил
    },
    status: {
        type: String,
        enum: [
            "Хятад",
            "Эрээн агуулах",
            "Замын-Үүд",
            "Салбар хувиарлагдсан",
            "Салбар дээр",
            "Хүргэлтэнд гарсан",
            "Хүргэгдсэн",
            "Саатсан",
        ],
        default: "Хятад",
    },
    price: {
        type: Number,
        default: 0, // 👈 default price = 0 (дараа тооцно)
    },
    weight: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // ✅ Reference to user
        required: false,
    },
}, { timestamps: true });
export default mongoose.model("Track", trackSchema);
