import express from "express";
import {
  createTrack,
  deleteTrack,
  getTrack,
  getTracks,
  updateTrack,
} from "../controllers/track.controller.js";

const trackRoutes = express.Router();

trackRoutes
  .post("/", createTrack)
  .get("/", getTracks)
  .get("/:id", getTrack)
  .put("/:id", updateTrack)
  .delete("/:id", deleteTrack);

export default trackRoutes;
