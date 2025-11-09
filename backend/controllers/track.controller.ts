import { Request, Response } from "express";
import TrackModel from "../models/Track.model.js";

export const createTrackByUser = async (req: Request, res: Response) => {
  try {
    const { trackingNumber, userId } = req.body;

    if (!trackingNumber || !userId) {
      return res.status(400).json({
        success: false,
        message: "Tracking number болон user ID шаардлагатай!",
      });
    }

    let track = await TrackModel.findOne({ trackingNumber });

    if (track) {
      if (!track.user) {
        track.user = userId;
        await track.save();
      }
      return res.json({
        success: true,
        message: "Track already exists and linked to your account.",
        data: track,
      });
    }

    track = await TrackModel.create({ trackingNumber, user: userId });

    return res.status(201).json({
      success: true,
      message: "New track created successfully.",
      data: track,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error occurred.",
    });
  }
};
export const adminScanTrack = async (req: Request, res: Response) => {
  try {
    const { trackingNumber, location, status } = req.body;
    if (!trackingNumber || !location || !status) {
      return res.status(400).json({
        success: false,
        message: "Tracking number болон байршил оруулна уу!",
      });
    }

    let track = await TrackModel.findOne({ trackingNumber });

    if (track) {
      track.status = status;
      track.location = location;
      await track.save();

      return res.status(200).json({
        success: true,
        message: `Track байршил шинэчлэгдлээ (${location})`,
        data: track,
      });
    }

    const newTrack = await TrackModel.create({
      trackingNumber,
      location,
      status: status,
      user: null,
    });

    return res.status(201).json({
      success: true,
      message: "Шинэ track үүсгэлээ!",
      data: newTrack,
    });
  } catch (error) {
    console.error("❌ admin-scan error:", error);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа!",
    });
  }
};

export const getTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await TrackModel.find()
      .populate("user", "name email number")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tracks,
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

    if (!track) {
      return res
        .status(404)
        .json({ success: false, message: "Track not found" });
    }

    return res.status(200).json({ success: true, data: track });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedTrack = await TrackModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrack) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Track updated successfully.",
      data: updatedTrack,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTrack = await TrackModel.findByIdAndDelete(id);

    if (!deletedTrack) {
      return res
        .status(404)
        .json({ success: false, message: "Track not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Track deleted successfully.",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTracksByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tracks = await TrackModel.find({ user: id })
      .populate("user", "name email number role")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: tracks });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTrackByTrackingNumber = async (req: Request, res: Response) => {
  try {
    const { trackingNumber } = req.params;

    const track = await TrackModel.findOne({ trackingNumber });

    if (!track) {
      return res
        .status(404)
        .json({ success: false, message: "Track not found" });
    }

    return res.status(200).json({ success: true, data: track });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
