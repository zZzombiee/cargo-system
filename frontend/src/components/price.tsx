"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Price = () => {
  const [weight, setWeight] = useState(0); // actual weight
  const [dimensions, setDimensions] = useState(""); // "100x60x30"
  const [price, setPrice] = useState(0);
  const [chargeableWeight, setChargeableWeight] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [weight, dimensions]);

  const calculatePrice = () => {
    if (!dimensions) return;

    // parse "100x60x30"
    const [length, width, height] = dimensions
      .split("x")
      .map((v) => parseFloat(v));

    if (!length || !width || !height) return;

    const volumetricWeight = (length * width * height) / 6000;
    const chargeWeight = Math.max(weight, volumetricWeight);
    setChargeableWeight(chargeWeight);

    const ratePerKg = 8000; // ₮ per kg (can be adjusted)
    const total = chargeWeight * ratePerKg;

    setPrice(Math.round(total));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <div className="grid gap-3">
          <Label>Жин (кг)</Label>
          <Input
            type="number"
            placeholder="жишээ: 50"
            value={weight === 0 ? "" : weight}
            onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
            min={0}
          />
        </div>

        <div className="grid gap-3">
          <Label>Хэмжээ (см)</Label>
          <Input
            type="text"
            placeholder="жишээ: 100x60x30"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3">
        <Label>Төлбөрт жин (кг)</Label>
        <p className="flex items-center h-9 p-3 border rounded-md bg-gray-50">
          {chargeableWeight.toFixed(2)} кг
        </p>
      </div>

      <div className="grid gap-3">
        <Label>Нийт үнэ (₮)</Label>
        <p className="flex items-center h-9 p-3 border rounded-md bg-gray-50">
          {new Intl.NumberFormat("mn-MN").format(price)} ₮
        </p>
      </div>
    </div>
  );
};

export default Price;
