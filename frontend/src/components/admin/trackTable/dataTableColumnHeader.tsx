"use client";

import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const toggleSort = () => {
    if (column.getIsSorted() === "asc") column.toggleSorting(true);
    else if (column.getIsSorted() === "desc") column.clearSorting();
    else column.toggleSorting(false);
  };

  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      <Input
        placeholder={title}
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(e) => column.setFilterValue(e.target.value)}
        className="h-8 text-sm w-full rounded-md "
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSort}
        className="flex-shrink-0"
      >
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        )}
      </Button>
    </div>
  );
}
