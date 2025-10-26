"use client";

import { useTrack } from "@/context/TrackContext";
import { DataTable } from "@/components/sidebar/data-table";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const { allTracks, fetchAllTracks, loading } = useTrack();

  useEffect(() => {
    fetchAllTracks();
  }, [allTracks]);

  return (
    <div className="p-6 space-y-6">
      <DataTable
        data={allTracks.map((t) => ({
          _id: t._id,
          trackingNumber: t.trackingNumber,
          location: t.location,
          status: Array.isArray(t.status)
            ? t.status.join(", ")
            : String(t.status ?? ""),
          weight:
            typeof t.weight === "number" ? t.weight : Number(t.weight ?? 0),
          price: typeof t.price === "number" ? t.price : Number(t.price ?? 0),
          date: t.createdAt ? new Date(t.createdAt) : new Date(),
        }))}
      />
    </div>
  );
}
