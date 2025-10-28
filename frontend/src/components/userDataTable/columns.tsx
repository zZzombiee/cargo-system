"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, User } from "lucide-react";
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
import UserTracks from "./userTracks";
import { DataTableColumnHeader } from "./dataTableColumnHeader";

export type User = {
  _id: string;
  name: string;
  email: string;
  number: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "index",
    accessorFn: (row) => row._id,
    header: () => {
      return <div className="text-center">№</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
    meta: { className: "w-[20px] text-left" },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
    size: 20,
    meta: { className: "w-[20px] text-left" },
  },
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number" />
    ),
    meta: { className: "w-[20px] text-left" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    meta: { className: "w-[20px] text-left" },
  },
  {
    accessorKey: "role",
    header: "Role",
    meta: { className: "w-[20px] text-left" },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => moment(row.original.createdAt).format("YYYY-MM-DD"),
    meta: { className: "w-[20px] text-left" },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-end w-full">
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="px-2 py-1 text-sm hover:bg-gray-100 w-full text-left rounded-sm">
                    Customer Tracks
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px]">
                  <SheetHeader>
                    <SheetTitle>{user.name}&apos;s Tracks</SheetTitle>
                  </SheetHeader>
                  {/* ✅ You can render your customer track component here */}
                  <div className="mt-4 px-2">
                    <UserTracks userId={user._id} />
                  </div>
                </SheetContent>
              </Sheet>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    meta: { className: "w-[20px] text-left" },
  },
];
