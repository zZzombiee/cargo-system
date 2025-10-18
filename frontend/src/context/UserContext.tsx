"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import api from "@/lib/axios";

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
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  fetchUser: async () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
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
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userid");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
