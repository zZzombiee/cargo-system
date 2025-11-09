"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { SidebarMenuButton } from "@/components/ui";

const locationList = [
  "Хятад",
  "Эрээн",
  "Замын-Үүд",
  "Улаанбаатар",
  "Салбар1",
  "Салбар2",
  "Салбар3",
];

export default function AdminTrackDialog() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [location, setLocation] = useState("Хятад");
  const [status, setStatus] = useState("Хятадад байгаа");
  const [submitting, setSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // ✅ Automatically update status when location changes
  const handleLocationChange = (value: string) => {
    setLocation(value);

    if (["Хятад", "Эрээн"].includes(value)) {
      setStatus("Хятадад байгаа");
    } else if (["Замын-Үүд", "Улаанбаатар"].includes(value)) {
      setStatus("Монголд ирсэн");
    } else if (["Салбар1", "Салбар2", "Салбар3"].includes(value)) {
      setStatus("Салбарт очсон");
    } else {
      setStatus("Саатсан");
    }
  };

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
        location,
        status,
      });

      toast.dismiss(loadingToast);
      toast.success(res.data.message || "Амжилттай шинэчлэгдлээ!");
      setTrackingNumber("");
      setOpenDialog(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ Admin scan error:", err);
      toast.error(err.response?.data?.message || "Scan хийхэд алдаа гарлаа!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip={"Quick Create"}
          className="bg-[#101828] text-white w-full flex justify-start p-2 rounded-md hover:bg-[#1D2939] transition-colors gap-2 items-center flex-row max-h-8 hover:text-white"
        >
          <IconCirclePlusFilled className="w-4 h-4 text-center" />
          <span>Quick Create</span>
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Track Scan (Админ)</DialogTitle>
        </DialogHeader>

        <Card className="shadow-none border-none">
          <CardContent className="flex flex-col gap-3 p-0 pt-4">
            <Input
              placeholder="Track code"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />

            <select
              className="border rounded-md p-2"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
            >
              {locationList.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* ✅ Display the auto-updated status */}
            {/* <div className="text-sm text-gray-600 bg-gray-50 border rounded-md px-3 py-2">
              <strong>Auto Status:</strong> <span>{status}</span>
            </div> */}

            <Button
              onClick={handleScan}
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {submitting ? "Шинэчилж байна..." : "Scan / Update"}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
