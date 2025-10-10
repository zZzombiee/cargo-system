import mongoose, { Schema } from "mongoose";
type User = {
  _id: string;
  email: String;
  confirmPassword: String;
  password: String;
  role: "ADMIN" | "USER";
};

const UserSchema = new Schema<User>(
  {
    email: { type: String, require: true },
    confirmPassword: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
