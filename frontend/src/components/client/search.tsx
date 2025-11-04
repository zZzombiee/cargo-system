"use client";

import { useState } from "react";
import { Track } from "@/context/TrackContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";
import moment from "moment";

export default function TrackSearch() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [foundTrack, setFoundTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      toast.error("Track code оруулна уу!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get(`/track/trackNumber/${trackingNumber}`);
      toast.success(data.message || "Track мэдээлэл");
      setFoundTrack(data.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Таны хайсан Track олдсонгүй!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10 max-w-screen w-2/3">
      <div className="flex gap-2">
        <Input
          placeholder="Enter tracking number..."
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="w-72"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {!foundTrack || (
        <div className="mt-6 w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            📦 Tracking Information
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Tracking #:</span>
              <span className="font-mono text-gray-900">
                {foundTrack?.trackingNumber}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Status:</span>
              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    foundTrack?.status === "Хүргэгдсэн"
                      ? "bg-green-100 text-green-700"
                      : foundTrack?.status === "Саатсан"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {foundTrack?.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {foundTrack?.statusHistory?.length
                    ? moment(
                        foundTrack.statusHistory[
                          foundTrack.statusHistory.length - 1
                        ].updatedAt
                      ).format("LLL")
                    : moment(foundTrack?.createdAt).format("LLL")}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Location:</span>
              <span>{foundTrack?.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
