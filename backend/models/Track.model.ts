import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITrack extends Document {
  trackingNumber: string;
  location:
    | "Хятад"
    | "Эрээн"
    | "Замын-Үүд"
    | "Улаанбаатар"
    | "Салбар1"
    | "Салбар2"
    | "Салбар3";
  status:
    | "Хятадад байгаа"
    | "Хятадаас гарсан"
    | "Монголд ирсэн"
    | "Салбарт очсон"
    | "Саатсан"
    | "Хүргэгдсэн";
  price?: number;
  weight?: number;
  user?: Types.ObjectId;
  statusHistory?: {
    status: string;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const trackSchema = new Schema<ITrack>(
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
        "Хятадаас гарсан",
        "Монголд ирсэн",
        "Салбарт очсон",
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

export default mongoose.model<ITrack>("Track", trackSchema);
