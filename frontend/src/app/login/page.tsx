"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const { login, loading, user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email format");

    if (!email || !password) return toast.error("Please fill all fields");
    const normalizedEmail = email.trim().toLowerCase();
    await login(normalizedEmail, password);
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="mx-auto flex flex-col gap-4 border p-10 rounded-lg bg-white shadow-lg dark:bg-gray-900">
        <h1 className="text-2xl text-center">Login</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <Input
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            onClick={() => toggleShowPassword()}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
        <Button onClick={() => router.push("/register")} variant={"outline"}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Login;
