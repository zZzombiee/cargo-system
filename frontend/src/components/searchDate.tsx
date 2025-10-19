"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";

interface SearchDateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchDate = ({ setOrders }: SearchDateProps) => {
  const [date, setDate] = useState<DateRange | undefined>();

  const handleSelect = async (range: DateRange | undefined) => {
    setDate(range);

    if (!range?.from || !range?.to) return;

    try {
      const res = await api.post(`/order/date`, {
        startDate: range.from,
        endDate: range.to,
      });

      if (res.data.orders.length === 0) {
        toast.error("No orders found in this range");
        setOrders([]);
      } else {
        setOrders(res.data.orders);
        toast.success("Orders filtered successfully!");
      }
    } catch (error) {
      console.error("Failed to fetch orders by date:", error);
      toast.error("Error fetching orders by date");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          {date?.from && date?.to
            ? `${format(date.from, "yyyy/MM/dd")} - ${format(
                date.to,
                "yyyy/MM/dd"
              )}`
            : "Select date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDate;
