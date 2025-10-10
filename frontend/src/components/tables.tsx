"use client";

import axios from "axios";
import { useEffect, useState } from "react";
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
import moment from "moment";

export interface Order {
  _id: string;
  orderNumber: string;
  productName: string[];
  senderName: string;
  receiverName: string;
  weight: number;
  status: "Ordered" | "PreparingToShip" | "Shipped" | "Delivered";
  location: string;
  price: number;
  createdAt: string;
}

const Tables = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/order`);
        setOrders(response.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Table className="max-w-7xl mx-auto mt-10 rounded-3xl">
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow className="grid grid-cols-6 font-bold bg-gray-200 pl-4">
          <TableHead className="flex items-center ">ID</TableHead>
          <TableHead className="flex items-center">Захиалгын дугаар</TableHead>
          {/* <TableHead className="">Барааны нэр</TableHead> */}
          {/* <TableHead className="">Илгээгчийн нэр</TableHead> */}
          {/* <TableHead className="">Хүлээн авагч</TableHead> */}
          {/* <TableHead className="">Жин (кг)</TableHead> */}
          <TableHead className="flex items-center">Үнэ (₮)</TableHead>
          <TableHead className="flex items-center">Статус</TableHead>
          <TableHead className="flex items-center">Байршил</TableHead>
          <TableHead className="flex items-center">Огноо</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: Order, index) => {
          const formatted = new Intl.NumberFormat("mn-MN").format(order.price);
          return (
            <TableRow key={order._id} className={`grid grid-cols-6 pl-4`}>
              <TableCell className="">{index + 1}</TableCell>
              <TableCell className="">{order.orderNumber}</TableCell>
              {/* <TableCell className="">{order.productName.join(", ")}</TableCell>*/}
              {/*<TableCell className="">{order.senderName}</TableCell>*/}
              {/*<TableCell className="">{order.receiverName}</TableCell>*/}
              {/*<TableCell className="">{order.weight} кг</TableCell> */}
              <TableCell className="">{formatted} ₮</TableCell>
              <TableCell className="">{order.status}</TableCell>
              <TableCell className="">{order.location}</TableCell>
              <TableCell className="">
                {moment(order.createdAt).format("MMM Do YY")}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
};

export default Tables;
