import { Request, Response } from "express";
import TrackModel from "../models/Track.model.js";

export const createTrackByUser = async (req: Request, res: Response) => {
  try {
    const { trackingNumber, userId } = req.body;

    let track = await TrackModel.findOne({ trackingNumber });

    if (track) {
      if (!track.user) {
        track.user = userId;
        await track.save();
      }
      return res.json({
        success: true,
        message: "Track already exists. Linked to your account.",
        data: track,
      });
    }

    track = await TrackModel.create({
      trackingNumber,
      user: userId,
      location: "Хятад",
      status: "Хятад",
    });

    res.status(201).json({
      success: true,
      message: "New track created successfully.",
      data: track,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminScanTrack = async (req: Request, res: Response) => {
  try {
    const { trackingNumber, status } = req.body;

    if (!trackingNumber || !status) {
      return res.status(400).json({ message: "Бүрэн мэдээлэл оруулна уу!" });
    }

    // Find track by trackingNumber
    const track = await TrackModel.findOne({ trackingNumber });

    if (track) {
      // ✅ Update location only
      track.status = status;
      await track.save();

      return res.status(200).json({
        success: true,
        message: `Track байршил шинэчлэгдлээ (${status})`,
        track,
      });
    }
    if (!track) {
      console.log("❌ Track not found for admin-scan:", trackingNumber);
      // ✅ If not found, create new track with location
      const newTrack = await TrackModel.create({
        trackingNumber,
        status: status,
        user: null,
      });
      console.log("✅ New track created:", newTrack);
      return res.status(201).json({
        success: true,
        message: "Шинэ track үүсгэлээ!",
        track: newTrack,
      });
    }
  } catch (error) {
    console.error("❌ admin-scan error:", error);
    return res.status(500).json({ message: "Серверийн алдаа гарлаа!" });
  }
};

// controllers/track.controller.ts
export const getTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await TrackModel.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tracks, // ✅ key matches frontend expectation
    });
  } catch (error: any) {
    console.error("❌ getTracks error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const track = await TrackModel.findById(id).populate(
      "user",
      "name email number"
    );
    if (!track)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: track });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update track
export const updateTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await TrackModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Track not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Delete track
export const deleteTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await TrackModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Track not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Track deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTracksByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // user id
    const tracks = await TrackModel.find({ user: id })
      .populate("user", "name email number role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tracks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
