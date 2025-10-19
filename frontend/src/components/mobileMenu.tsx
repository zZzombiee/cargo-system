"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";

const MobileMenu = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);

  const handleNav = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const menuItems = [
    { label: "Нүүр хуудас", path: "/user" },
    { label: "Бидний тухай", path: "/user/about" },
    { label: "Захиалга харах", path: "/user/orders" },
    { label: "Холбоо барих", path: "/user/contact" },
  ];

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="fixed right-0 top-0 h-full w-3/4 sm:w-1/3 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-lg">
        <DrawerHeader className="border-b border-gray-200 dark:border-gray-700 p-4">
          <DrawerTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {user ? (
              <div className="font-semibold w-full">{user.name}</div>
            ) : (
              <div className="font-semibold w-full">Цэс</div>
            )}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col justify-between h-full pb-4">
          <div className="flex flex-col items-start p-6">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors border-b w-full py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div>
            {user ? (
              <div className="flex flex-col gap-4 mt-4 w-full px-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleNav("/admin");
                  }}
                >
                  Admin page
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mt-4 w-full px-4">
                <Button onClick={() => handleNav("/login")} variant="outline">
                  Login
                </Button>
                <Button onClick={() => handleNav("/register")}>Register</Button>
              </div>
            )}
          </div>
        </div>
        <DrawerClose asChild>
          <Button
            variant="ghost"
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400"
          >
            ✕
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
