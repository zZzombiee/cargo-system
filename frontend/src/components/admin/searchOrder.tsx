"use client";

import { Input } from "../ui/input";
import api from "@/lib/axios";
import { SearchOrderProps } from "@/types/order";
import { useEffect, useState } from "react";

const SearchOrder = ({ setOrders }: SearchOrderProps) => {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchOrders = async () => {
        try {
          if (orderNumber.trim() === "") {
            const res = await api.get(`/order`);
            setOrders(res.data.orders || []);
            return;
          }

          const res = await api.post(`/order/orders`, { orderNumber });

          if (!res.data.orders || res.data.orders.length === 0) {
            setOrders([]);
          } else {
            setOrders(res.data.orders);
          }
        } catch (_err) {
          return;
        }
      };

      fetchOrders();
    }, 500);

    return () => clearTimeout(delay);
  }, [orderNumber, setOrders]);

  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Захиалгын код"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
      />
    </div>
  );
};

export default SearchOrder;
