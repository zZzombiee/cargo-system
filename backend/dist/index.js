import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/index.js";
import { orderRouter } from "./routes/order.router.js";
import { userRouter } from "./routes/user.router.js";

const app = express();

const port = 8000;

// CORS must be BEFORE other middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://cargo-system-hjqk.vercel.app",
      "https://cargo-system-iota.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

app.use("/order", orderRouter);
app.use("/user", userRouter);

const server = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
  });
};

server();
