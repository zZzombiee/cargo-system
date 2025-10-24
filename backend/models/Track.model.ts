import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITrack extends Document {
  orderNumber: string;
  location: string;
  status: string;
  price: number;
  weight: number;
  user: Types.ObjectId; // 👈 Connected to User
  createdAt: Date;
}

const trackSchema = new Schema<ITrack>(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<ITrack>("Track", trackSchema);
