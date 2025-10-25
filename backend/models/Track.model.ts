import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITrack extends Document {
  trackingNumber: string; // Баркод эсвэл tracking код
  location: string; // Одоогийн байршил
  status: string; // Төлөв
  price?: number; // Зарим үед үнийн дүн хараахан тодорхойгүй байж болно
  weight?: number;
  user?: Types.ObjectId; // Зарим track хэрэглэгчидтэй холбогдоогүй байж болно
  createdAt: Date;
  updatedAt: Date;
}

const trackSchema = new Schema<ITrack>(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<ITrack>("Track", trackSchema);
