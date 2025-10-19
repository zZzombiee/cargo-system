"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";
import { Order } from "./tables";

interface SearchOrder {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const SearchOrder = ({ setOrders }: SearchOrder) => {
  const [orderNumber, setOrderNumber] = useState("");

  const getOrder = async () => {
    try {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/order/order`,
        { orderNumber }
      );

      if (!res.data.order) {
        toast.error(res.data.message || "Order not found");
        setOrders([]);
      } else {
        setOrders([res.data.order]);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="Захиалгийн дугаар"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
      />
      <Button onClick={getOrder}>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default SearchOrder;
