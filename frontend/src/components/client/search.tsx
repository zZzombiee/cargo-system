"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Order } from "@/types/order";

const Search = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [fetchedOrder, setOrder] = useState<Order | null>(null);

  const getOrder = async () => {
    try {
      const res = await api.post(`/order/order`, {
        orderNumber,
      });
      if (!res.data.order) {
        toast.error(res.data.message || "Order not found");
        setOrder(null);
      } else {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
    }
  };

  return (
    <div className="flex flex-col max-w-2xl w-full mx-4 my-8 gap-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search from delivery code..."
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <Button onClick={getOrder}>
          <ArrowRight />
        </Button>
      </div>

      {fetchedOrder && (
        <div className="border rounded-lg p-4 mt-4 shadow-sm bg-gray-50 dark:bg-gray-800">
          <p>
            <strong>Order Number:</strong> {fetchedOrder.orderNumber}
          </p>
          {fetchedOrder.status && (
            <p>
              <strong>Status:</strong> {fetchedOrder.status}
            </p>
          )}
          {fetchedOrder.location && (
            <p>
              <strong>Location:</strong> {fetchedOrder.location}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
