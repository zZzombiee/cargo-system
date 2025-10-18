import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/index.js";
import { orderRouter } from "./routes/order.router.js";
import { userRouter } from "./routes/user.router.js";

const app = express();

app.use(express.json());

const port = 8000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://cargo-system-hjqk.vercel.app"],
    credentials: true,
  })
);

app.use("/order", orderRouter);
app.use("/user", userRouter);

const server = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
  });
};

server();
