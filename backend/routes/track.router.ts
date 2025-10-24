import express from "express";
import {
  createTrack,
  deleteTrack,
  getTrack,
  getTracks,
  getTracksByUser,
  updateTrack,
} from "../controllers/track.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const trackRoutes = express.Router();

trackRoutes
  .use(authMiddleware)
  .post("/", createTrack)
  .get("/", getTracks)
  .get("/:id", getTrack)
  .put("/:id", updateTrack)
  .delete("/:id", deleteTrack)
  .get("/user/:id", getTracksByUser);

export default trackRoutes;
