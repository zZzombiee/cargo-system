import { Request, Response } from "express";
import TrackModel from "../models/Track.model.js";

export const createTrackByUser = async (req: Request, res: Response) => {
  try {
    const { trackingNumber, userId } = req.body;

    if (!trackingNumber || !userId) {
      return res.status(400).json({
        success: false,
        message: "Tracking number болон User ID шаардлагатай!",
      });
    }

    const trackingUpper = trackingNumber.toUpperCase();

    let track = await TrackModel.findOne({ trackingNumber: trackingUpper });

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

    const newTrack = await TrackModel.create({
      trackingNumber: trackingUpper,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "New track created successfully.",
      data: newTrack,
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
        message: "Tracking number, байршил, статус шаардлагатай!",
      });
    }

    const trackingUpper = trackingNumber.toUpperCase();

    let track = await TrackModel.findOne({ trackingNumber: trackingUpper });

    if (track) {
      track.location = location;
      track.status = status;

      const lastHistory = track.history?.[track.history.length - 1];

      if (
        lastHistory &&
        lastHistory.location === location &&
        lastHistory.status === status
      ) {
        lastHistory.date = new Date();
      } else {
        track.history?.push({
          location,
          status,
          date: new Date(),
        });
      }

      await track.save();

      return res.status(200).json({
        success: true,
        message: "Track амжилттай шинэчлэгдлээ.",
        data: track,
      });
    }

    const newTrack = await TrackModel.create({
      trackingNumber: trackingUpper,
      location,
      status,
      user: null,
      history: [
        {
          location,
          status,
          date: new Date(),
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Шинэ track үүсгэлээ!",
      data: newTrack,
    });
  } catch (error) {
    console.error("❌ adminScanTrack error:", error);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа!",
    });
  }
};

export const getTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await TrackModel.find()
      .populate("user", "name email number role")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, tracks });
  } catch (error: any) {
    console.error("❌ getTracks error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const track = await TrackModel.findById(id).populate(
      "user",
      "name email number role"
    );

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }

    return res.status(200).json({ success: true, data: track });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTrack = async (req: Request, res: Response) => {
  try {
    const { weight, price, name, number } = req.body;
    const { id } = req.params;

    const track = await TrackModel.findById(id);
    if (!track) {
      return res
        .status(404)
        .json({ success: false, message: "Track not found" });
    }

    if (weight !== undefined) track.weight = weight;
    if (price !== undefined) track.price = price;
    if (name !== undefined) {
      track.userName = name;
    }
    if (number !== undefined) {
      track.userNumber = number;
    }

    await track.save();

    res.status(200).json({
      success: true,
      message: "Track updated",
      data: track,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTrack = await TrackModel.findByIdAndDelete(id);

    if (!deletedTrack) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
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

    const trackingUpper = trackingNumber.toUpperCase();

    const track = await TrackModel.findOne({
      trackingNumber: trackingUpper,
    }).populate("user", "name email number role");

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: track,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
