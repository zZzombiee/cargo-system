"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Track } from "@/context/TrackContext";

const Search = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [fetchedTrack, setFetchedTrack] = useState<Track | null>(null);

  const getTrack = async () => {
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }
    try {
      const { data } = await api.post(`/track/tracking-number`, {
        trackingNumber,
      });
      console.log(data);

      if (!data.track) {
        toast.error(data.message || "Track not found");
        setFetchedTrack(null);
      } else {
        setFetchedTrack(data.track);
      }
    } catch (err) {
      console.error("Error fetching track:", err);
    }
  };

  return (
    <div className="flex flex-col max-w-2xl w-full mx-4 my-8 gap-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search from delivery code..."
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <Button onClick={getTrack}>
          <ArrowRight />
        </Button>
      </div>

      {fetchedTrack && (
        <div className="border rounded-lg p-4 mt-4 shadow-sm bg-gray-50 dark:bg-gray-800">
          <p>
            <strong>Tracking Number:</strong> {fetchedTrack.trackingNumber}
          </p>
          {fetchedTrack.status && (
            <p>
              <strong>Status:</strong> {fetchedTrack.status}
            </p>
          )}
          {fetchedTrack.location && (
            <p>
              <strong>Location:</strong> {fetchedTrack.location}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
