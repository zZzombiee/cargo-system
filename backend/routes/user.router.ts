import express from "express";
import getUser from "../controllers/user/getUser.js";
import createUser from "../controllers/user/createUser.js";

export const userRouter = express.Router();

userRouter.get("/", getUser).post("/", createUser);
