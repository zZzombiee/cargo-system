"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, UserContextType } from "@/types/user";

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  fetchUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/user/${userId}`);
      setUser(res.data.user);
    } catch (err) {
      console.error("❌ Fetch user failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await api.post("/user/login", { email, password });
      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userid", user.id);
      setUser(user);
      toast.success("Logged in successfully!");

      if (user.role === "ADMIN") router.push("/admin");
      else router.push("/user");
      setLoading(false);
    } catch (_err) {
      toast.error("Имэйл эсвэл нууц үг буруу байна.");
      setLoading(false);
    }
  };

  const register = async (
    data: Omit<User, "id" | "role"> & { password: string }
  ) => {
    setLoading(true);
    try {
      await api.post(`/user`, data);
      toast.success("Registered successfully!");
      router.push("/login");
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Registration failed!");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userid");
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, login, register, logout, fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
