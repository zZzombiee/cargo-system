"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption } from "@/components/ui/table";
import api from "@/lib/axios";
import SearchDate from "../searchDate";
import { Order, Status, statusList } from "@/types/order";
import OrdersTableHeader from "./OrdersTableHeader";
import OrdersTableRow from "./OrdersTableRow";

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchFor, setSearchFor] = useState<Status | "">("");

  useEffect(() => {
    api
      .get(`/order`)
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  const updateOrder = async (id: string, data: Partial<Order>) => {
    try {
      await api.patch(`/order/${id}`, data);
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, ...data } : order))
      );
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md border">
      <h2 className="flex justify-between text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Захиалгын жагсаалт
        <SearchDate orders={orders} setOrders={setOrders} />
      </h2>

      <Table>
        <TableCaption>Таны сүүлийн захиалгууд</TableCaption>
        <OrdersTableHeader
          searchFor={searchFor}
          setSearchFor={setSearchFor}
          statusList={statusList}
          setOrders={setOrders}
        />
        <TableBody>
          {orders
            ?.filter((order) =>
              searchFor === "" ? true : order.status === searchFor
            )
            .map((order, i) => (
              <OrdersTableRow
                key={order._id}
                order={order}
                index={i}
                ordersCount={orders.length}
                updateOrder={updateOrder}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
