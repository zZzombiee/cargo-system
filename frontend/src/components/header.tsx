"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useUser } from "@/context/UserContext";
import Dropdown from "./dropdown";
import ModeToggle from "./themeToggle";
import { useTheme } from "next-themes";

const Header = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleNav = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  if (!mounted) return null; // SSR hydration алдаанаас сэргийлнэ

  return (
    <header className="w-full border-b backdrop-blur-md dark:bg-gray-900">
      <div className="flex justify-between items-center px-10 py-3 container mx-auto">
        {/* Logo */}
        <div onClick={() => handleNav("/user")} className="cursor-pointer">
          <Image
            src={theme === "dark" ? "/logo1.png" : "/logo.png"}
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          {[
            { label: "Бидний тухай", path: "/user/about" },
            { label: "Захиалга харах", path: "/user/tracks" },
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

        {/* Desktop Right Side */}
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
                // "Profile",
                // "Settings",
                ...(user.role === "ADMIN"
                  ? [
                      {
                        label: "Admin Page",
                        onClick: () => router.push("/admin"),
                      },
                    ]
                  : []),
                { label: "Logout", onClick: logout },
              ]}
            />
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center py-4 z-50">
            {[
              { label: "Бидний тухай", path: "/user/about" },
              { label: "Захиалга харах", path: "/user/tracks" },
              { label: "Холбоо барих", path: "/user/contact" },
            ].map((item) => (
              <p
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="cursor-pointer py-2 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </p>
            ))}
            {!user ? (
              <div className="flex flex-col gap-2 mt-4">
                <Button onClick={() => handleNav("/login")} variant="outline">
                  Login
                </Button>
                <Button onClick={() => handleNav("/register")}>Register</Button>
              </div>
            ) : (
              <Dropdown
                name={user.name}
                menuItems={[
                  "Profile",
                  "Settings",
                  { label: "Logout", onClick: logout },
                ]}
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
