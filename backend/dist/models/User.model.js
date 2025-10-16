import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    name: { type: String, require: true },
    number: { type: String, require: true },
}, { timestamps: true });
export const UserModel = mongoose.model("User", UserSchema);
