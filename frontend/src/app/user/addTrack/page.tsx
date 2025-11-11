"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useUser } from "@/context/UserContext";

const AddTrack = () => {
  const { user } = useUser();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTrack = async () => {
    if (!trackingNumber.trim()) {
      toast.error("Track code оруулна уу!");
      return;
    }
    if (!user?.id) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй!");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/track/user/create", {
        trackingNumber,
        userId: user.id,
      });
      toast.success(res.data.message || "Амжилттай үүсгэлээ!");
      setTrackingNumber("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ Track create error:", err);
      toast.error(err.response?.data?.message || "Үүсгэхэд алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Карго үүсгэх</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Track code оруулна уу..."
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <Button
            onClick={handleCreateTrack}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Үүсгэж байна..." : "Track үүсгэх"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTrack;
