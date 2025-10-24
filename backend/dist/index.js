import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/index.js";
import { orderRouter } from "./routes/order.router.js";
import { userRouter } from "./routes/user.router.js";
import trackRoutes from "./routes/track.router.js";

const app = express();

app.use(express.json());

const port = 8000;

app.use(
  cors({
    origin: [
      "https://cargo-system-iota.vercel.app",
      "http://localhost:3000",
      "https://cargo-system-a8x0sfb0s-itgelts-projects-35418efe.vercel.app",
    ],
    credentials: true,
  })
);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/api/tracks", trackRoutes);

const server = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
  });
};

server();
