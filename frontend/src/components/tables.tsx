"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
    axios
      .get(
        `${
          process.env.VITE_API_URL + "/order" || "http://localhost:8000/order"
        }`
      )
      .then((res) => setOrders(res.data.orders))
      .catch(console.error);
  }, []);

  const updateOrder = async (id: string, data: Partial<Order>) => {
    try {
      await axios.patch(
        `${
          process.env.VITE_API_URL + "/" + id ||
          `http://localhost:8000/order/${id}`
        }`,
        data
      );
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, ...data } : order))
      );
    } catch (error) {
      console.error(error);
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
    <div className="max-w-6xl mx-auto mt-10 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Захиалгын жагсаалт
      </h2>

      <Table>
        <TableCaption>Таны сүүлийн захиалгууд</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <TableHead className="text-center w-[60px]">№</TableHead>
            <TableHead className="text-center w-[180px]">Захиалгын №</TableHead>
            <TableHead className="text-center w-[120px]">Үнэ (₮)</TableHead>
            <TableHead className="text-center w-[120px]">
              Төлбөрт жин (кг)
            </TableHead>
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

        <TableFooter />
      </Table>
    </div>
  );
};

export default Tables;
