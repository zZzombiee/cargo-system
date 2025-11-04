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

  // ✅ Fetch current user using token
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      router.push("/login");
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await api.post("/user/login", { email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setUser(user);

      toast.success("Logged in successfully!");
      if (user.role === "admin") router.push("/admin");
      else router.push("/user");
    } catch (err) {
      toast.error("Имэйл эсвэл нууц үг буруу байна.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register
  const register = async (
    data: Omit<User, "id" | "role"> & { password: string }
  ) => {
    try {
      setLoading(true);
      await api.post("/user/register", data);
      toast.success("Registered successfully!");
      router.push("/login");
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
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
