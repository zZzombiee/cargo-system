import mongoose, { Schema } from "mongoose";
type User = {
  _id: string;
  email: string;
  password: string;
  name: string;
  number: string;
  role: "ADMIN" | "USER";
};

const UserSchema = new Schema<User>(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    name: { type: String, require: true },
    number: { type: String, require: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
