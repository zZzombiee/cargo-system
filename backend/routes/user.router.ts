import express from "express";
import getUsers from "../controllers/user/getUsers.js";
import createUser from "../controllers/user/createUser.js";
import { login } from "../controllers/user/login.js";
import getUser from "../controllers/user/getUser.js";

export const userRouter = express.Router();

userRouter
  .get("/", getUsers)
  .post("/", createUser)
  .post("/login", login)
  .get("/:id", getUser);
