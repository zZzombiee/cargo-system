"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Track, useTrack } from "@/context/TrackContext";

export default function AdminTracksPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("Эрээн агуулах");
  const [submitting, setSubmitting] = useState(false); // ✅ fixed local loading
  const { allTracks, fetchAllTracks } = useTrack();

  useEffect(() => {
    fetchAllTracks();
  }, []);

  const handleScan = async () => {
    if (!trackingNumber.trim()) {
      toast.error("Track code оруулна уу!");
      return;
    }

    try {
      setSubmitting(true);
      const loadingToast = toast.loading("Track шалгаж байна...");

      const res = await api.post("/track/admin-scan", {
        trackingNumber,
        status,
      });

      toast.dismiss(loadingToast);
      toast.success(res.data.message || "Амжилттай шинэчлэгдлээ!");

      setTrackingNumber("");
      await fetchAllTracks(); // ✅ refresh the tracks list
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ Admin scan error:", err);
      toast.error(err.response?.data?.message || "Scan хийхэд алдаа гарлаа!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* === SCAN / CREATE / UPDATE SECTION === */}
      <Card>
        <CardHeader>
          <CardTitle>Track Scan (Админ)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Track code"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <select
            className="border rounded-md p-2 w-full sm:w-48"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Эрээн агуулах">Эрээн агуулах</option>
            <option value="Замын-Үүд">Замын-Үүд</option>
            <option value="Салбар хувиарлагдсан">Салбар хувиарлагдсан</option>
            <option value="Салбар дээр">Салбар дээр</option>
            <option value="Хүргэлтэнд гарсан">Хүргэлтэнд гарсан</option>
            <option value="Хүргэгдсэн">Хүргэгдсэн</option>
            <option value="Саатсан">Саатсан</option>
          </select>

          <Button onClick={handleScan} disabled={submitting}>
            {submitting ? "Шинэчилж байна..." : "Scan / Update"}
          </Button>
        </CardContent>
      </Card>

      {/* === TRACKS LIST === */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTracks.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            Track мэдээлэл алга байна.
          </p>
        ) : (
          allTracks.map((t: Track) => (
            <Card key={t._id} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  {t.trackingNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1 text-gray-600">
                <p>📍 Байршил: {t.location}</p>
                <p>🚚 Төлөв: {t.status}</p>
                <p>👤 Хэрэглэгч: {t.user?.name || "—"}</p>
                <p className="text-xs text-gray-400">
                  ⏱ {new Date(t.updatedAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
