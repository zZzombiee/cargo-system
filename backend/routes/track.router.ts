import express from "express";
import {
  adminScanTrack,
  createTrackByUser,
  deleteTrack,
  getTrack,
  getTrackByTrackingNumber,
  getTracks,
  getTracksByUser,
  updateTrack,
} from "../controllers/track.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const trackRoutes = express.Router();

trackRoutes
  // .use(authMiddleware)
  .post("/user/create", createTrackByUser)
  .post("/admin-scan", adminScanTrack)
  .get("/", getTracks)
  .get("/:id", getTrack)
  .put("/:id", updateTrack)
  .delete("/:id", deleteTrack)
  .get("/user/:id", getTracksByUser)
  .get("/trackNumber/:trackingNumber", getTrackByTrackingNumber);

export default trackRoutes;
