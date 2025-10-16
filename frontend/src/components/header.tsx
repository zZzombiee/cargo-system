"use client";

import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  const handleNav = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 w-full border-b backdrop-blur-md dark:bg-gray-900">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleNav("/user")}
      >
        {theme === "dark" ? (
          <Image src="/logo1.png" alt="LogoDark" width={120} height={40} />
        ) : (
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
        )}
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-4 items-center">
        <p
          className="cursor-pointer border-r px-4 py-2"
          onClick={() => handleNav("/user/about")}
        >
          Бидний тухай
        </p>
        <p
          className="cursor-pointer border-r px-4 py-2"
          onClick={() => handleNav("/user/tracks")}
        >
          Захиалга харах
        </p>
        <p
          className="cursor-pointer px-4 py-2"
          onClick={() => handleNav("/user/contact")}
        >
          Холбоо барих
        </p>
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-2">
        <ModeToggle />
        {!user ? (
          <>
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="mr-2"
            >
              Login
            </Button>
            <Button onClick={() => router.push("/register")}>Register</Button>
          </>
        ) : (
          <Dropdown
            name={`${user?.name}`}
            menuItems={[
              "Profile",
              "Settings",
              { label: "Logout", onClick: logout },
            ]}
          />
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center gap-2">
        <ModeToggle />
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center py-4 z-50">
          <p
            className="cursor-pointer py-2"
            onClick={() => handleNav("/user/about")}
          >
            Бидний тухай
          </p>
          <p
            className="cursor-pointer py-2"
            onClick={() => handleNav("/user/tracks")}
          >
            Захиалга харах
          </p>
          <p
            className="cursor-pointer py-2"
            onClick={() => handleNav("/user/contact")}
          >
            Холбоо барих
          </p>

          {!user ? (
            <div className="flex flex-col gap-2 mt-2">
              <Button
                onClick={() => handleNav("/login")}
                variant="outline"
                className="w-[150px]"
              >
                Login
              </Button>
              <Button
                onClick={() => handleNav("/register")}
                className="w-[150px]"
              >
                Register
              </Button>
            </div>
          ) : (
            <div className="mt-2">
              <Dropdown
                name={`${user?.name}`}
                menuItems={[
                  "Profile",
                  "Settings",
                  { label: "Logout", onClick: logout },
                ]}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
