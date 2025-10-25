import express from "express";
import { registerUser, loginUser, getAllUsers, getCurrentUser, } from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";
const userRouter = express.Router();
userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/", verifyToken, isAdmin, getAllUsers)
    .get("/me", verifyToken, getCurrentUser);
export default userRouter;
