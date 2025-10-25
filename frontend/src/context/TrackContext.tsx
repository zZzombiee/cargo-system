"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

export interface Track {
  updatedAt: string | number | Date;
  _id: string;
  trackingNumber: string;
  location: string;
  status: [
    "Хятад",
    "Эрээн агуулах",
    "Замын-Үүд",
    "Салбар хувиарлагдсан",
    "Салбар дээр",
    "Хүргэлтэнд гарсан",
    "Хүргэгдсэн",
    "Саатсан"
  ];
  price: number;
  weight: number;
  createdAt: Date;
  statusHistory?: {
    status: string;
    updatedAt: Date;
  }[];
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface TrackContextType {
  allTracks: Track[];
  userTracks: Track[];
  loading: boolean;
  fetchAllTracks: () => Promise<void>;
  fetchUserTracks: () => Promise<void>;
  createTrack: (trackData: Omit<Track, "_id" | "user">) => Promise<void>;
  updateTrack: (id: string, data: Partial<Track>) => Promise<void>;
  deleteTrack: (id: string) => Promise<void>;
}

const TrackContext = createContext<TrackContextType>({
  allTracks: [],
  userTracks: [],
  loading: true,
  fetchAllTracks: async () => {},
  fetchUserTracks: async () => {},
  createTrack: async () => {},
  updateTrack: async () => {},
  deleteTrack: async () => {},
});

export const useTrack = () => useContext(TrackContext);

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [userTracks, setUserTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  /** ✅ Fetch all tracks (admin) */
  const fetchAllTracks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.get("/track", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Safely extract array
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.tracks)
        ? res.data.tracks
        : [];

      setAllTracks(data);
    } catch (error: unknown) {
      console.error("❌ Failed to fetch tracks:", error);
      toast.error("Failed to load tracking data");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Fetch tracks for logged-in user */
  const fetchUserTracks = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await api.get(`/track/user/${user._id}`);
      setUserTracks(res.data.tracks || []);
    } catch (err) {
      console.error("❌ Failed to fetch user tracks:", err);
      toast.error("Failed to load your tracks");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Create a new track */
  const createTrack = async (trackData: Omit<Track, "_id" | "user">) => {
    try {
      setLoading(true);
      const res = await api.post("/track", {
        ...trackData,
        user: user?._id, // match backend model
      });
      toast.success("Track created successfully!");
      // Update local state
      setUserTracks((prev) => [...prev, res.data.data]);
      setAllTracks((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error("❌ Failed to create track:", err);
      toast.error("Failed to create track");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Update existing track */
  const updateTrack = async (id: string, data: Partial<Track>) => {
    try {
      const res = await api.put(`/track/${id}`, data);
      toast.success("Track updated!");

      setUserTracks((prev) =>
        prev.map((track) => (track._id === id ? res.data.data : track))
      );
      setAllTracks((prev) =>
        prev.map((track) => (track._id === id ? res.data.data : track))
      );
    } catch (err) {
      console.error("❌ Failed to update track:", err);
      toast.error("Failed to update track");
    }
  };

  /** ✅ Delete track */
  const deleteTrack = async (id: string) => {
    try {
      await api.delete(`/track/${id}`);
      setUserTracks((prev) => prev.filter((t) => t._id !== id));
      setAllTracks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Track deleted");
    } catch (err) {
      console.error("❌ Failed to delete track:", err);
      toast.error("Failed to delete track");
    }
  };

  /** Auto-fetch user tracks when user logs in */
  useEffect(() => {
    if (user) fetchUserTracks();
  }, [user]);

  return (
    <TrackContext.Provider
      value={{
        allTracks,
        userTracks,
        loading,
        fetchAllTracks,
        fetchUserTracks,
        createTrack,
        updateTrack,
        deleteTrack,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
