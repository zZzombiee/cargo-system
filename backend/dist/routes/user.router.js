import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";

const userRouter = express.Router();

userRouter
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/", verifyToken, isAdmin, getAllUsers)
  .get("/:id", verifyToken, getUserById);

export default userRouter;
