"use client";

import { Track } from "@/context/TrackContext";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { statusColors } from "@/types/track";

const UserTracks = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [userTracks, setUserTracks] = useState<Track[]>([]);

  const fetchUserTracks = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/track/user/${userId}`);

      const data = Array.isArray(res.data.data)
        ? res.data.data
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
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    statusColors[track.status as keyof typeof statusColors]
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
