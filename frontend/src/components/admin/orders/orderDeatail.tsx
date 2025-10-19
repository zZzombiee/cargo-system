"use client";

import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropsDetail } from "@/types/order";

export const OrderDetailDialog = ({ order, setOpen, open }: PropsDetail) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md sm:max-w-xl rounded-2xl shadow-lg">
        {/* Header */}
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center justify-between text-lg font-semibold">
            <span>Захиалгын дэлгэрэнгүй</span>
            <Badge
              variant={
                order.status === "Хүргэгдсэн"
                  ? "default"
                  : order.status === "Саатсан"
                  ? "secondary"
                  : "outline"
              }
              className="text-xs px-2 py-1"
            >
              {order.status}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400 text-sm">
            Захиалгын дугаар:{" "}
            <span className="font-medium">{order.orderNumber}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="grid gap-4 py-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Үнэ</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {order.price.toLocaleString()} ₮
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Жин</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {order.weight} кг
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Огноо</span>
            <span className="text-gray-700 dark:text-gray-300">
              {moment(order.createdAt).format("YYYY/MM/DD")}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Байршил</span>
            <span className="text-gray-700 dark:text-gray-300">
              {order.location}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <Button
            variant="outline"
            className="rounded-lg"
            onClick={() => setOpen(false)}
          >
            Хаах
          </Button>
          <Button className="rounded-lg" onClick={() => window.print()}>
            Хэвлэх
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
