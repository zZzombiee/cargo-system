import mongoose, { Schema } from "mongoose";
const trackSchema = new Schema(
  {
    trackingNumber: {
      type: String,
      required: [true, "Tracking number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    location: {
      type: String,
      default: "Хятад",
      enum: [
        "Хятад",
        "Эрээн",
        "Замын-Үүд",
        "Улаанбаатар",
        "Салбар1",
        "Салбар2",
        "Салбар3",
      ],
    },
    status: {
      type: String,
      default: "Хятадад байгаа",
      enum: [
        "Хятадад байгаа",
        "Эрээнд ирсэн",
        "Монголд ирсэн",
        "Улаанбаатарт ирсэн",
        "Салбарт ирсэн",
        "Саатсан",
        "Хүргэгдсэн",
      ],
    },
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    weight: {
      type: Number,
      default: 0,
      min: [0, "Weight cannot be negative"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    statusHistory: [
      {
        status: { type: String },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Track", trackSchema);
