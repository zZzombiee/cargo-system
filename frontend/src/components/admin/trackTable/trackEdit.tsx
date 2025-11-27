"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Price from "../price";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TrackEdit({ track }: { track: any }) {
  const router = useRouter();

  const [userNumber, setUserNumber] = useState(track.user?.number || "");
  const [userName, setUserName] = useState(track.user?.name || "");
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [chargeableWeight, setChargeableWeight] = useState(0);

  const handlePriceChange = (data: {
    price: number;
    chargeableWeight: number;
  }) => {
    setCalculatedPrice(data.price);
    setChargeableWeight(data.chargeableWeight);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.put(`/track/${track._id}`, {
        weight: chargeableWeight,
        price: calculatedPrice,
        userName,
        userNumber,
      });

      if (!data.success) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success("Track updated!");
      router.refresh();
    } catch (err) {
      toast.error("Server error occurred");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="px-2 py-1 text-sm hover:bg-gray-100 w-full text-left rounded-sm">
          Edit
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] px-4">
        <SheetHeader>
          <SheetTitle>Edit Track #{track.trackingNumber}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex flex-col gap-6">
          <Price onChange={handlePriceChange} />

          <div className="grid gap-3">
            <Label>User Name</Label>
            <Input
              placeholder="user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <Label>User Number</Label>
            <Input
              placeholder="user number"
              value={userNumber}
              onChange={(e) => setUserNumber(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
