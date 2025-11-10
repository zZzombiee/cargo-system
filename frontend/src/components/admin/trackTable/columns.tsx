"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";
import { DataTableColumnHeader } from "./dataTableColumnHeader";
import { Track } from "@/types/track";
import TrackDetail from "./trackDetail";
export const columns: ColumnDef<Track>[] = [
  {
    id: "index",
    accessorFn: (row) => row._id,
    header: () => <div className="text-center">№</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    meta: { className: "w-[60px] text-center" },
  },
  {
    accessorKey: "trackingNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Track Number" />
    ),
    cell: ({ row }) => (
      <div className="font-medium truncate">
        {row.getValue("trackingNumber")}
      </div>
    ),
    meta: { className: "w-[220px]" },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
    meta: { className: "w-[180px]" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
    meta: { className: "w-[160px]" },
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => <div>{row.getValue("weight")}</div>,
    meta: { className: "w-[100px] text-right" },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
    meta: { className: "w-[100px] text-right" },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => moment(row.original.createdAt).format("YYYY-MM-DD"),
    meta: { className: "w-[140px]" },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const track = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-end w-full">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>!Edit</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="px-2 py-1 text-sm hover:bg-gray-100 w-full text-left rounded-sm">
                    Track detail
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px]">
                  <SheetHeader>
                    <SheetTitle>
                      #{track.trackingNumber} <p>Тээврийн дэлгэрэнгүй</p>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-4 px-2">
                    <TrackDetail trackId={track._id} />
                  </div>
                </SheetContent>
              </Sheet>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">!Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    meta: { className: "w-[80px] text-right" },
  },
];
