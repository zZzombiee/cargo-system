"use client";

import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Order } from "./tables";

interface SearchOrderProps {
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const SearchOrder = ({ setOrders }: SearchOrderProps) => {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchOrders = async () => {
        try {
          // If empty → get all orders
          if (orderNumber.trim() === "") {
            const res = await api.get(`/order`);
            setOrders(res.data.orders || []);
            return;
          }

          // Partial search → get all matches
          const res = await api.post(`/order/orders`, { orderNumber });

          if (!res.data.orders || res.data.orders.length === 0) {
            setOrders([]);
          } else {
            setOrders(res.data.orders);
          }
        } catch (err) {
          return;
        }
      };

      fetchOrders();
    }, 500); // debounce delay

    return () => clearTimeout(delay);
  }, [orderNumber, setOrders]);

  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Захиалгын дугаар"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
      />
    </div>
  );
};

export default SearchOrder;
