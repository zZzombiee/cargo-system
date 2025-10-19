"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import api from "@/lib/axios";
import SearchOrder from "./searchOrder";
import SearchDate from "./searchDate";

export interface Order {
  _id: string;
  orderNumber: string;
  price: number;
  status:
    | "Бүртгүүлсэн"
    | "Эрээнд ирсэн"
    | "Монголд ирсэн"
    | "Хүргэгдсэн"
    | "Саатсан"
    | "Цуцалсан";
  location: "Улаанбаатар" | "Эрээн" | "Замын-Үүд" | "Хятад";
  weight: number;
  createdAt: string;
}

const Tables = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api
      .get(`${process.env.NEXT_PUBLIC_API_URL}/order`)
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  const updateOrder = async (id: string, data: Partial<Order>) => {
    try {
      await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`, data);
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, ...data } : order))
      );
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const statuses: Order["status"][] = [
    "Бүртгүүлсэн",
    "Эрээнд ирсэн",
    "Монголд ирсэн",
    "Хүргэгдсэн",
    "Саатсан",
    "Цуцалсан",
  ];

  const locations: Order["location"][] = [
    "Хятад",
    "Эрээн",
    "Замын-Үүд",
    "Улаанбаатар",
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md border">
      <h2 className="flex justify-between text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Захиалгын жагсаалт
        <SearchOrder orders={orders} setOrders={setOrders} />
        <SearchDate setOrders={setOrders} />
      </h2>

      <Table>
        <TableCaption>Таны сүүлийн захиалгууд</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <TableHead className="text-center w-[60px]">№</TableHead>
            <TableHead className="text-center w-[180px]">Захиалгын №</TableHead>
            <TableHead className="text-center w-[120px]">Үнэ (₮)</TableHead>
            <TableHead className="text-center w-[120px]">Жин (кг)</TableHead>
            <TableHead className="text-center w-[185px]">Статус</TableHead>
            <TableHead className="text-center w-[160px]">Байршил</TableHead>
            <TableHead className="text-center w-[160px]">Огноо</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order, i) => (
            <TableRow
              key={order._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell className="text-center font-medium">{i + 1}</TableCell>
              <TableCell className="text-center font-mono">
                {order.orderNumber}
              </TableCell>
              <TableCell className="text-center">
                {new Intl.NumberFormat("mn-MN").format(order.price)} ₮
              </TableCell>
              <TableCell className="text-center">
                {new Intl.NumberFormat("mn-MN").format(order.weight)} кг
              </TableCell>

              <TableCell className="text-center">
                <Select
                  value={order.status}
                  onValueChange={(v) =>
                    updateOrder(order._id, { status: v as Order["status"] })
                  }
                >
                  <SelectTrigger className="w-[165px] mx-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell className="text-center">
                <Select
                  value={order.location}
                  onValueChange={(v) =>
                    updateOrder(order._id, { location: v as Order["location"] })
                  }
                >
                  <SelectTrigger className="w-[140px] mx-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell className="text-center text-gray-500 dark:text-gray-400">
                {moment(order.createdAt).format("YYYY/MM/DD")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tables;
