"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

/* ========================
   🧩 Track Type Definition
   ======================== */
export interface Track {
  _id: string;
  trackingNumber: string;
  location: string;
  status:
    | "Хятад"
    | "Эрээн агуулах"
    | "Замын-Үүд"
    | "Салбар хувиарлагдсан"
    | "Салбар дээр"
    | "Хүргэлтэнд гарсан"
    | "Хүргэгдсэн"
    | "Саатсан";
  price: number;
  weight: number;
  createdAt: Date;
  updatedAt: string | number | Date;
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

/* ========================
   ⚙️ Context Type
   ======================== */
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

/* ========================
   🌐 Context Creation
   ======================== */
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

/* ========================
   🧠 Provider Component
   ======================== */
interface TrackProviderProps {
  children: ReactNode;
}

export const TrackProvider: React.FC<TrackProviderProps> = ({ children }) => {
  const { user } = useUser();

  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [userTracks, setUserTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  /* ✅ Fetch all tracks (Admin only) */
  const fetchAllTracks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/track", { headers: getAuthHeaders() });

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.tracks)
        ? res.data.tracks
        : [];

      setAllTracks(data);
    } catch (error) {
      console.error("❌ Failed to fetch all tracks:", error);
      toast.error("Failed to load tracking data");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Fetch tracks for logged-in user */
  const fetchUserTracks = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await api.get(`/track/user/${user._id}`, {
        headers: getAuthHeaders(),
      });

      const data = Array.isArray(res.data.tracks)
        ? res.data.tracks
        : Array.isArray(res.data)
        ? res.data
        : [];

      setUserTracks(data);
    } catch (error) {
      console.error("❌ Failed to fetch user tracks:", error);
      toast.error("Failed to load your tracks");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Create new track */
  const createTrack = async (trackData: Omit<Track, "_id" | "user">) => {
    try {
      setLoading(true);
      const res = await api.post(
        "/track",
        { ...trackData, user: user?._id },
        { headers: getAuthHeaders() }
      );

      const newTrack = res.data.data || res.data.track || res.data;

      setUserTracks((prev) => [...prev, newTrack]);
      setAllTracks((prev) => [...prev, newTrack]);

      toast.success("Track created successfully!");
    } catch (error) {
      console.error("❌ Failed to create track:", error);
      toast.error("Failed to create track");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Update existing track */
  const updateTrack = async (id: string, data: Partial<Track>) => {
    try {
      setLoading(true);
      const res = await api.put(`/track/${id}`, data, {
        headers: getAuthHeaders(),
      });

      const updated = res.data.data || res.data.track || res.data;

      setUserTracks((prev) =>
        prev.map((track) => (track._id === id ? updated : track))
      );
      setAllTracks((prev) =>
        prev.map((track) => (track._id === id ? updated : track))
      );

      toast.success("Track updated successfully!");
    } catch (error) {
      console.error("❌ Failed to update track:", error);
      toast.error("Failed to update track");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Delete track */
  const deleteTrack = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/track/${id}`, { headers: getAuthHeaders() });

      setUserTracks((prev) => prev.filter((t) => t._id !== id));
      setAllTracks((prev) => prev.filter((t) => t._id !== id));

      toast.success("Track deleted successfully!");
    } catch (error) {
      console.error("❌ Failed to delete track:", error);
      toast.error("Failed to delete track");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Auto-fetch logic */
  useEffect(() => {
    if (!user) return;

    // Fetch depending on user role
    if (user.role === "admin") fetchAllTracks();
    else fetchUserTracks();
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

/* ✅ Default export for convenience */
export default TrackProvider;
