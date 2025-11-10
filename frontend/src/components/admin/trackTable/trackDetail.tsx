"use client";

import { useEffect, useState } from "react";
import { Loader2, MapPin, User, Package, CalendarDays } from "lucide-react";
import api from "@/lib/axios";
import { Track, statusColors, locationStatusMap } from "@/types/track";

interface TrackDetailProps {
  trackId: string;
}

const TrackDetail = ({ trackId }: TrackDetailProps) => {
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState<Track | null>(null);

  const fetchTrackDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/track/${trackId}`);
      setTrack(res.data.data || res.data.track || res.data);
    } catch (error) {
      console.error("❌ Failed to fetch track detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackId) fetchTrackDetail();
  }, [trackId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">
          Мэдээлэл ачааллаж байна...
        </span>
      </div>
    );

  if (!track)
    return (
      <p className="text-muted-foreground text-sm">
        Тээврийн дэлгэрэнгүй мэдээлэл олдсонгүй.
      </p>
    );

  const user =
    typeof track.user === "string"
      ? { name: "Тодорхойгүй", email: "Тодорхойгүй" }
      : track.user;

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            statusColors[track.status]
          }`}
        >
          {track.status}
        </span>
      </div>

      <div className="border rounded-lg p-4 space-y-1 bg-muted/30">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <User className="h-4 w-4" /> Хэрэглэгчийн мэдээлэл
        </h3>
        <p>👤 Нэр: {user?.name || "Тодорхойгүй"}</p>
        <p>✉️ И-мэйл: {user?.email || "Тодорхойгүй"}</p>
      </div>

      <div className="border rounded-lg p-4 space-y-1 bg-muted/30">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Package className="h-4 w-4" /> Илгээмжийн мэдээлэл
        </h3>
        <p>⚖️ Жин: {track.weight ?? "–"} кг</p>
        <p>💰 Үнэ: {track.price?.toLocaleString() ?? "–"} ₮</p>
        <p>📦 Байршил: {track.location}</p>
        <p>📅 Үүсгэсэн: {new Date(track.createdAt).toLocaleString()}</p>
      </div>

      <div className="border rounded-lg p-4 bg-muted/30">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <MapPin className="h-4 w-4" /> Байршлын түүх
        </h3>

        {track.statusHistory && track.statusHistory.length > 0 ? (
          <ul className="space-y-2">
            {track.statusHistory.map((entry, i) => {
              const location = locationStatusMap[track.location];
              return (
                <li
                  key={i}
                  className="flex justify-between items-center border-b pb-1"
                >
                  <span className="text-sm">
                    {entry.status} — {location || "Тодорхойгүй байршил"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.updatedAt).toLocaleString()}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            Байршлын түүхийн мэдээлэл байхгүй байна.
          </p>
        )}
      </div>

      <div className="text-xs text-gray-400 flex items-center gap-1">
        <CalendarDays className="h-3 w-3" />
        Сүүлийн шинэчлэл: {new Date(track.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default TrackDetail;
