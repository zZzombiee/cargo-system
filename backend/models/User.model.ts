import mongoose, { Schema } from "mongoose";
type User = {
  _id: string;
  userName: String;
  email: String;
  password: String;
  role: "ADMIN" | "USER";
};

const UserSchema = new Schema<User>(
  {
    userName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
