"use client";

import { useEffect, useState } from "react";
import { useTrack } from "@/context/TrackContext";
import { useUser } from "@/context/UserContext";
import TableSkeleton from "@/components/tableSkeleton";
import { motion } from "framer-motion";
import { TrackTable } from "@/components/admin/trackTable/trackTable";
import { columns } from "@/components/admin/trackTable/columns";
import { Track } from "@/types/track";
import api from "@/lib/axios";
import SearchDate from "@/components/admin/searchDate";

export default function AdminDashboardPage() {
  const { loading } = useTrack();
  const { user } = useUser();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

  const fetchTracks = async () => {
    try {
      const res = await api.get("/track");
      const all = res.data.data || res.data.tracks || [];
      setTracks(all);
      setFilteredTracks(all); // ✅ show all by default
    } catch (err) {
      console.error("❌ Error fetching track:", err);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") fetchTracks();
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <SearchDate tracks={tracks} setTracks={setFilteredTracks} />
      </div>

      <TrackTable columns={columns} data={filteredTracks} />
    </div>
  );
}
