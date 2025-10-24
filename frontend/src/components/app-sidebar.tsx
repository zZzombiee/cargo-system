"use client";

import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2, ChevronUp } from "lucide-react";
import Link from "next/link";

const CargoAdminSidebar = () => {
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { title: "Orders", icon: Package, href: "/admin/orders" },
    { title: "Customers", icon: Users, href: "/admin/customers" },
    { title: "Tracking", icon: Truck, href: "/admin/tracking" },
    { title: "Reports", icon: BarChart3, href: "/admin/reports" },
    { title: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <Sidebar className="border-r shadow-sm">
      <SidebarContent>
        <SidebarGroup className="min-h-screen pb-10">
          <SidebarGroupLabel className="text-lg font-semibold px-2">
            Cargo Admin
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col justify-between h-full">
              <div>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg px-3 py-2"
                      >
                        <item.icon className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="mt-auto flex items-center justify-between w-full hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <User2 className="h-5 w-5" />
                      <span>Admin</span>
                    </div>
                    <ChevronUp className="h-4 w-4 opacity-60" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] rounded-md border bg-white dark:bg-gray-900 shadow-md"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile" className="px-3 py-2">
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="px-3 py-2">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button
                      className="w-full text-left px-3 py-2 text-red-600"
                      onClick={() => console.log("Logout")}
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CargoAdminSidebar;
