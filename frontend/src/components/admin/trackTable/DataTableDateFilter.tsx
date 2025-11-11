"use client";

import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { mn } from "date-fns/locale"; // Optional Mongolian locale

interface Props<TData, TValue> {
  column: Column<TData, TValue>;
  title?: string;
}

export function DataTableDateFilter<TData, TValue>({
  column,
  title = "Огноогоор шүүх",
}: Props<TData, TValue>) {
  const [date, setDate] = React.useState<{ from: Date; to?: Date } | undefined>(
    () => {
      const v =
        (column.getFilterValue() as { from?: Date; to?: Date } | undefined) ||
        undefined;
      return v && v.from ? { from: v.from, to: v.to } : undefined;
    }
  );

  const handleSelect = (range?: { from?: Date; to?: Date } | null) => {
    if (!range || !range.from) {
      setDate(undefined);
      column.setFilterValue(undefined);
      return;
    }
    const normalized = { from: range.from, to: range.to };
    setDate(normalized);
    column.setFilterValue(normalized);
  };

  const displayLabel =
    date && date.from && date.to
      ? `${format(date.from, "yyyy-MM-dd")} → ${format(date.to, "yyyy-MM-dd")}`
      : date && date.from
      ? format(date.from, "yyyy-MM-dd")
      : title;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-8 text-sm w-auto"
        >
          <CalendarIcon className="h-4 w-4" />
          {displayLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-fit" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={(range) =>
            handleSelect(range || { from: undefined, to: undefined })
          }
          locale={mn}
          numberOfMonths={1}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
