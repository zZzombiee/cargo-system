"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownProps } from "@/types/order";

const Dropdown = ({ name, menuItems, onItemClick }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="capitalize font-semibold cursor-pointer">
        {name}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {menuItems.map((item, index) => {
          const label = typeof item === "string" ? item : item.label;
          const handleClick =
            typeof item === "string"
              ? () => onItemClick?.(item)
              : item.onClick || (() => {});

          return (
            <DropdownMenuItem
              key={index}
              onClick={handleClick}
              className="cursor-pointer"
            >
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
