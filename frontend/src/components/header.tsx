"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "./dropdown";
import { Button } from "./ui/button";

const Header = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Safe way to get localStorage value after mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    setUserId(storedUserId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userid");
    setUserId(null);
    router.push("/login");
  };

  return (
    <header className="flex justify-around p-2 w-full border-b bg-white/80 backdrop-blur-md">
      {/* 🔹 Logo */}
      <div className="flex items-center">
        <div className="flex flex-col font-bold leading-none">
          <p className="text-blue-500 text-xl">Go</p>
          <p className="text-red-500 text-xl">Cargo.</p>
        </div>
      </div>

      {/* 🔹 Menu */}
      <div className="flex gap-4 items-center">
        <Dropdown
          name="account"
          menuItems={["Profile", "Settings", "Logout"]}
        />
        <Dropdown
          name="billing"
          menuItems={["Invoices", "Payment Methods", "Billing History"]}
        />
      </div>

      {/* 🔹 Auth buttons */}
      <div className="flex items-center">
        {!userId ? (
          <>
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="mr-4"
            >
              Login
            </Button>
            <Button onClick={() => router.push("/register")} className="mr-4">
              Register
            </Button>
          </>
        ) : (
          <div className="mr-4">
            <Dropdown
              name="user"
              menuItems={[
                "Profile",
                "Settings",
                // { label: "Logout", onClick: handleLogout },
              ]}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
