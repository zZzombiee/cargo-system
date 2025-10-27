"use client";

import { useEffect } from "react";
import { useTrack } from "@/context/TrackContext";
import { useUser } from "@/context/UserContext";
import { DataTable } from "@/components/sidebar/data-table";
import TableSkeleton from "@/components/tableSkeleton"; // new component
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const { allTracks, fetchAllTracks, loading } = useTrack();
  const { user } = useUser();

  useEffect(() => {
    if (user?.role === "admin") fetchAllTracks();
  }, [user]);

  if (loading)
    return (
      <div className="px-12 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <TableSkeleton />
        </motion.div>
      </div>
    );

  if (!allTracks?.length)
    return (
      <div className="text-center text-gray-500 py-10">
        No tracking data found.
      </div>
    );

  const tableData = allTracks.map((t) => ({
    _id: t._id,
    trackingNumber: t.trackingNumber,
    location: t.location,
    status: Array.isArray(t.status) ? t.status.join(", ") : t.status || "",
    weight: +t.weight || 0,
    price: +t.price || 0,
    date: new Date(t.createdAt),
  }));

  return (
    <div className="p-6 space-y-6">
      <DataTable data={tableData} />
    </div>
  );
}
