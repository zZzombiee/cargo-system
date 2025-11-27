import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getCurrentUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/", verifyToken, isAdmin, getAllUsers)
  .get("/me", verifyToken, getCurrentUser)
  .put("/update-role/:id", updateUserRole);

export default userRouter;
