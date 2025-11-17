import mongoose, { Schema, Document } from "mongoose";

interface IHistory {
  location: string;
  status: string;
  date: Date;
}

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
    | "Эрээнд ирсэн"
    | "Монголд ирсэн"
    | "Улаанбаатарт ирсэн"
    | "Салбарт очсон"
    | "Саатсан"
    | "Хүргэгдсэн";
  price?: number;
  weight?: number;
  itemName?: string;
  user?: mongoose.Types.ObjectId; // <-- reference to User model
  history?: IHistory[];
  createdAt: Date;
  updatedAt: Date;
  userName?: string;
  userNumber?: string;
}

const HistorySchema = new Schema<IHistory>(
  {
    location: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { _id: false }
);

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
        "Эрээнд ирсэн",
        "Монголд ирсэн",
        "Улаанбаатарт ирсэн",
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

    itemName: {
      type: String,
      required: false,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    history: {
      type: [HistorySchema],
      default: [],
    },
    userName: { type: String, required: false },
    userNumber: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITrack>("Track", trackSchema);
