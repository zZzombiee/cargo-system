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
import { authMiddleware, isAdmin } from "../middleware/auth.middleware.js";

const trackRoutes = express.Router();

trackRoutes.post("/user/create", authMiddleware, createTrackByUser);

trackRoutes.post("/admin-scan", authMiddleware, isAdmin, adminScanTrack);

trackRoutes.get("/", getTracks); // Public
trackRoutes.get("/:id", getTrack); // Public

trackRoutes.put("/:id", authMiddleware, updateTrack);
trackRoutes.delete("/:id", authMiddleware, deleteTrack);

trackRoutes.get("/user/:id", authMiddleware, getTracksByUser);
trackRoutes.get("/trackNumber/:trackingNumber", getTrackByTrackingNumber); // Public

export default trackRoutes;
