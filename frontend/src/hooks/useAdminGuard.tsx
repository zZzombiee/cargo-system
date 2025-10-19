"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export const useAdminGuard = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/user");
      return;
    }

    if (user.role !== "ADMIN") {
      router.push("/user");
    }
  }, [user, loading, router]);

  const isChecking = loading || !user || user.role !== "ADMIN";
  return { user, isChecking };
};
