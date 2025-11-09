"use client";

import { Track } from "@/context/TrackContext";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const statusColors: Record<Track["status"], string> = {
  Хятад: "bg-gray-200 text-gray-800",
  "Эрээн агуулах": "bg-blue-100 text-blue-700",
  "Замын-Үүд": "bg-yellow-100 text-yellow-700",
  "Салбар хувиарлагдсан": "bg-purple-100 text-purple-700",
  "Салбар дээр": "bg-indigo-100 text-indigo-700",
  "Хүргэлтэнд гарсан": "bg-orange-100 text-orange-700",
  Хүргэгдсэн: "bg-green-100 text-green-700",
  Саатсан: "bg-red-100 text-red-700",
};

const UserTracks = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [userTracks, setUserTracks] = useState<Track[]>([]);

  const fetchUserTracks = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/track/user/${userId}`);

      const data = Array.isArray(res.data.tracks)
        ? res.data.tracks
        : Array.isArray(res.data)
        ? res.data
        : [];

      setUserTracks(data);
    } catch (error) {
      console.error("❌ Failed to fetch user tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchUserTracks();
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">
          Тээвэрлэлтийн мэдээлэл ачааллаж байна...
        </span>
      </div>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Customer Tracks</h2>

      {userTracks.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Энэ хэрэглэгчид тээврийн бүртгэл алга байна.
        </p>
      ) : (
        <div className="space-y-3">
          {userTracks.map((track, i) => (
            <div
              key={track._id || i}
              className="border rounded-lg p-3 hover:bg-muted transition-colors"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">№ {track.trackingNumber}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    statusColors[track.status]
                  }`}
                >
                  {track.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                📍 Байршил: {track.location}
              </p>
              <p className="text-sm text-gray-600">
                ⚖️ Жин: {track.weight} кг | 💰 Үнэ:{" "}
                {track.price.toLocaleString()}₮
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Үүсгэсэн:{" "}
                {new Date(track.createdAt).toLocaleDateString("mn-MN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTracks;
