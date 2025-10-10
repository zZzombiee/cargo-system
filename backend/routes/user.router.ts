import express from "express";
import getUser from "../controllers/user/getUser.js";
import createUser from "../controllers/user/createUser.js";
import { login } from "../controllers/user/login.js";

export const userRouter = express.Router();

userRouter.get("/", getUser).post("/", createUser).post("/login", login);
