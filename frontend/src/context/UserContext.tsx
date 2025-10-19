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

interface User {
  _id?: string;
  email: string;
  name: string;
  number?: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    data: Omit<User, "_id" | "role"> & { password: string }
  ) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

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
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
      );
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/user/login", { email, password });
      const user = res.data.user;

      localStorage.setItem("userid", user.id);
      setUser(user);
      toast.success("Logged in successfully!");

      if (user.role === "ADMIN") router.push("/admin");
      else router.push("/user");
    } catch (err) {
      toast.error("Имэйл эсвэл нууц үг буруу байна.");
    }
  };

  const register = async (
    data: Omit<User, "_id" | "role"> & { password: string }
  ) => {
    try {
      await api.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, data);
      toast.success("Registered successfully!");
      router.push("/login");
    } catch {
      toast.error("Registration failed!");
    }
  };

  const logout = () => {
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
