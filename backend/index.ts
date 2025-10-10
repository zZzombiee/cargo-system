import express from "express";
import cors from "cors";
import { connectDb } from "./database";
import { orderRouter } from "./routes";

const app = express();

app.use(express.json());

const port = 8000;

app.use(cors());

app.use("/", orderRouter);

const server = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`server running at a http://localhost:${port}/`);
  });
};

server();
