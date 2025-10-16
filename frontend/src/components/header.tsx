"use client";

import { useRouter } from "next/navigation";
import Dropdown from "./dropdown";
import { Button } from "./ui/button";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import ModeToggle from "./themeToggle";

const Header = () => {
  const router = useRouter();
  const { user, logout } = useUser();

  const handleTracking = () => {
    router.push("/user/tracks");
  };

  return (
    <header className="flex justify-around p-2 w-full border-b backdrop-blur-md dark:bg-gray-900">
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
        <Dropdown name="about" menuItems={["about"]} />
        <Dropdown
          name="tracking"
          menuItems={[{ label: "Tracking", onClick: handleTracking }]}
        />
        <Dropdown name="contacts" menuItems={["Contacts"]} />
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {!user ? (
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
          <div className="mr-4 flex gap-2">
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
