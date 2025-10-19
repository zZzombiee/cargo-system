"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Tab from "@/components/tabs";
import { useUser } from "@/context/UserContext";

const AdminPage = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Хэрвээ хэрэглэгч байхгүй эсвэл role нь ADMIN биш бол redirect хийнэ
    if (!user || user.role !== "ADMIN") {
      router.push("/user");
    }
  }, [user, router]);

  // Хэрэглэгч байхгүй үед ачаалж байгаа мэт харуулах
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Түр хүлээнэ үү...</p>
      </div>
    );
  }

  // Зөвхөн ADMIN-д харагдах хэсэг
  if (user.role === "ADMIN") {
    return (
      <div className="flex w-full flex-col gap-3 max-w-7xl mx-auto my-10">
        <p className="text-4xl font-extrabold px-4 md:px-6 lg:mx-auto">
          Admin Page
        </p>
        <Tab />
      </div>
    );
  }

  return null; // redirect хийгдэх үед хоосон буцаана
};

export default AdminPage;
