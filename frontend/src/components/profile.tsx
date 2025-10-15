"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

const Profile = () => {
  const { user, loading, logout } = useUser();
  const router = useRouter();

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center gap-2 p-6 w-80 border rounded-2xl shadow-md">
        <Skeleton className="h-[100px] w-[100px] rounded-full" />
        <Skeleton className="h-[36px] w-[100px] rounded-xl mt-4" />
        <Skeleton className="h-[20px] w-[120px] rounded-xl" />
        <Skeleton className="h-[20px] w-[100px] rounded-xl" />
        <Skeleton className="h-[40px] w-full rounded-xl mt-4" />
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col justify-center items-center gap-2 p-6 w-80 border rounded-2xl shadow-md ">
        <Skeleton className="h-[100px] w-[100px] rounded-full" />
        <p>No user logged in.</p>
        <Button onClick={() => router.push("/login")} className="mt-4">
          Go to Login
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center gap-2 p-6 w-80 border rounded-2xl shadow-md">
      <Image
        src="/profilePic.png"
        alt="Profile"
        className="rounded-full"
        width={100}
        height={100}
      />
      <p className="text-2xl font-bold mt-4">{user.name}</p>
      <p className="">{user.email}</p>
      {user.number && <p className="">{user.number}</p>}
      <Button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-4 w-full "
      >
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
