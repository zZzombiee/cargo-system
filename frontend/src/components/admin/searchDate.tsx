"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/lib/axios";
import { SearchOrder } from "@/types/order";

const SearchDate = ({ orders, setOrders }: SearchOrder) => {
  const [date, setDate] = useState<DateRange | undefined>();

  const fetchOrdersByDate = async (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) {
      // 👇 No date selected → fetch all orders
      try {
        const res = await api.get(`/order`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch all orders", err);
      }
      return;
    }

    try {
      const res = await api.post(`/order/date`, {
        startDate: range.from,
        endDate: range.to,
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch by date", err);
    }
  };

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    fetchOrdersByDate(range);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="
            w-fit 
            justify-center text-left font-normal
            text-sm sm:text-base
            px-3 py-2
          "
        >
          <CalendarIcon className="mr-0 sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy/MM/dd")} -{" "}
                  {format(date.to, "yyyy/MM/dd")}
                </>
              ) : (
                format(date.from, "yyyy/MM/dd")
              )
            ) : (
              "Огноогоор шүүх"
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDate;
