"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrdersPage() {
  const orders = [
    {
      id: 1,
      number: "ORD-001",
      customer: "Bat",
      status: "Хүргэгдсэн",
      date: "2025-10-18",
    },
    {
      id: 2,
      number: "ORD-002",
      customer: "Bold",
      status: "Хүлээгдэж буй",
      date: "2025-10-17",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Захиалгууд</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Захиалгын дугаар</TableHead>
            <TableHead>Харилцагч</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead>Огноо</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell>{o.id}</TableCell>
              <TableCell>{o.number}</TableCell>
              <TableCell>{o.customer}</TableCell>
              <TableCell>{o.status}</TableCell>
              <TableCell>{o.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
