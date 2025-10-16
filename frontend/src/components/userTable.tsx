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

export interface Order {
  _id: string;
  orderNumber: string;
  price: number;
  status: "Хятад агуулахад" | "Замд явж байна" | "Хүргэгдсэн" | "Саатсан";
  location: "Улаанбаатар" | "Эрээн" | "Замын-Үүд" | "Хятад";
  createdAt: string;
}

const UserTables = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/order")
      .then((res) => setOrders(res.data.orders))
      .catch(console.error);
  }, []);

  return (
    <div className="mx-auto mt-10 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border max-w-screen">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Захиалгын жагсаалт
      </h2>

      <Table>
        <TableCaption>Таны сүүлийн захиалгууд</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <TableHead className="text-center w-[60px]">№</TableHead>
            <TableHead className="text-center w-[180px]">Захиалгын №</TableHead>
            {/* <TableHead className="text-center w-[120px]">Үнэ (₮)</TableHead> */}
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
              {/* <TableCell className="text-center">
                {new Intl.NumberFormat("mn-MN").format(order.price)} ₮
              </TableCell> */}

              <TableCell className="text-center">{order.status}</TableCell>

              <TableCell className="text-center">{order.location}</TableCell>

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

export default UserTables;
