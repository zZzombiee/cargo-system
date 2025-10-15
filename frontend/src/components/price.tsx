"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PriceProps {
  onChange?: (data: { price: number; chargeableWeight: number }) => void;
  ratePerKg?: number;
}

const Price = ({ onChange, ratePerKg = 8000 }: PriceProps) => {
  const [weight, setWeight] = useState<number>(0);
  const [dimensions, setDimensions] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [chargeableWeight, setChargeableWeight] = useState<number>(0);

  useEffect(() => {
    calculatePrice();
  }, [weight, dimensions]);

  const calculatePrice = () => {
    if (!dimensions.trim()) {
      setPrice(0);
      setChargeableWeight(weight);
      onChange?.({ price: 0, chargeableWeight: weight });
      return;
    }

    const parts = dimensions
      .toLowerCase()
      .split("x")
      .map((v) => parseFloat(v.trim()));
    if (parts.length !== 3 || parts.some(isNaN)) {
      setPrice(0);
      setChargeableWeight(weight);
      onChange?.({ price: 0, chargeableWeight: weight });
      return;
    }

    const [length, width, height] = parts;
    const volumetricWeight = (length * width * height) / 6000;
    const chargeWeight = Math.max(weight, volumetricWeight);
    const total = chargeWeight * ratePerKg;

    setChargeableWeight(chargeWeight);
    setPrice(Math.round(total));
    onChange?.({ price: Math.round(total), chargeableWeight: chargeWeight });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <div className="grid gap-2 w-full ">
          <Label>Бодит жин (кг)</Label>
          <Input
            type="number"
            placeholder="жишээ: 50"
            value={weight || ""}
            onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
            min={0}
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label>Савны хэмжээ (см)</Label>
          <Input
            type="text"
            placeholder="жишээ: 100x60x30"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
          />
        </div>
      </div>

      {/* 🔹 Chargeable weight */}
      <div className="grid gap-2">
        <Label>Төлбөрт жин (кг)</Label>
        <p className="flex items-center h-10 px-3 border rounded-md bg-gray-50 dark:bg-gray-800">
          {chargeableWeight.toFixed(2)} кг
        </p>
      </div>

      {/* 🔹 Total price */}
      <div className="grid gap-2">
        <Label>Нийт үнэ (₮)</Label>
        <p className="flex items-center h-10 px-3 border rounded-md bg-gray-50 font-medium dark:bg-gray-800">
          {price > 0 ? new Intl.NumberFormat("mn-MN").format(price) : 0} ₮
        </p>
      </div>
    </div>
  );
};

export default Price;
