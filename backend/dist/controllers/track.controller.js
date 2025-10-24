import TrackModel from "../models/Track.model.js";
// ✅ Create a new track
export const createTrack = async (req, res) => {
    try {
        const track = await TrackModel.create(req.body);
        res.status(201).json({ success: true, data: track });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getTracks = async (_req, res) => {
    try {
        const tracks = await TrackModel.find()
            .populate("user", "name email number role") // 👈 fetch user details
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: tracks });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getTrack = async (req, res) => {
    try {
        const { id } = req.params;
        const track = await TrackModel.findById(id).populate("user", "name email number");
        if (!track)
            return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, data: track });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ✅ Update track
export const updateTrack = async (req, res) => {
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
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// ✅ Delete track
export const deleteTrack = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
