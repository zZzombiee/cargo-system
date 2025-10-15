"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "./dropdown";
import { Button } from "./ui/button";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const router = useRouter();
  const { user, loading, logout } = useUser();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    setUserId(storedUserId);
  }, [user]);

  const handleTracking = () => {
    router.push("/user/tracks");
  };

  return (
    <header className="flex justify-around p-2 w-full border-b bg-white/80 backdrop-blur-md">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/user")}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <div className="flex flex-col font-bold leading-none">
          <p className="text-blue-500 text-xl">Go</p>
          <p className="text-red-500 text-xl">Cargo.</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Dropdown name="about" menuItems={["Profile", "Settings", "Logout"]} />
        <Dropdown
          name="tracking"
          menuItems={[
            { label: "Tracking", onClick: handleTracking },
            "Payment Methods",
            "Billing History",
          ]}
        />
        <Dropdown
          name="contacts"
          menuItems={["Contacts", "Groups", "Blocked"]}
        />
      </div>
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
    </header>
  );
};

export default Header;
