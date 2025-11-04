"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { useUser } from "@/context/UserContext";
import Dropdown from "./dropdown";
import ModeToggle from "./themeToggle";
import { useTheme } from "next-themes";
import MobileMenu from "./mobileMenu";

const Header = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleNav = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <header className="w-full border-b backdrop-blur-md dark:bg-gray-900">
      <div className="flex justify-between items-center px-2 md:px-10 container mx-auto">
        <div onClick={() => handleNav("/user")} className="cursor-pointer">
          <Image
            src={theme === "dark" ? "/logo1.png" : "/logo.png"}
            alt="Logo"
            width={120}
            height={40}
            priority
            style={{ height: "auto", width: "auto" }}
          />
        </div>

        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          {[
            { label: "Нүүр хуудас", path: "/user" },
            { label: "Бидний тухай", path: "/user/about" },
            { label: "Захиалга харах", path: "/user/orders" },
            { label: "Холбоо барих", path: "/user/contact" },
          ].map((item) => (
            <p
              key={item.path}
              onClick={() => handleNav(item.path)}
              className="cursor-pointer hover:text-blue-600 transition-colors"
            >
              {item.label}
            </p>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          {!user ? (
            <>
              <Button onClick={() => handleNav("/login")} variant="outline">
                Login
              </Button>
              <Button onClick={() => handleNav("/register")}>Register</Button>
            </>
          ) : (
            <Dropdown
              name={user.name}
              menuItems={[
                ...(user.role === "admin"
                  ? [
                      {
                        label: "Admin Page",
                        onClick: () => router.push("/admin"),
                      },
                    ]
                  : []),
                {
                  label: "Add Track",
                  onClick: () => router.push("/user/addTrack"),
                },
                { label: "Logout", onClick: logout },
              ]}
            />
          )}
        </div>

        <div className="md:hidden flex items-center gap-3 ">
          <ModeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
