import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/index.js";
import { orderRouter } from "./routes/getItem.js";

const app = express();

app.use(express.json());

const port = 8000;

app.use(cors());

app.use("/", orderRouter);

const server = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
  });
};

server();
