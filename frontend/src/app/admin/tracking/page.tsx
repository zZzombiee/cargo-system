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
import { SidebarMenuButton, useSidebar } from "@/components/ui";

export default function AdminTrackDialog() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("Эрээн агуулах");
  const [submitting, setSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { open } = useSidebar();

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
      </DialogContent>
    </Dialog>
  );
}
