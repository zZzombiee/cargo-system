"use client";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    router.push("/register");
  };
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required", {
        description: "Please fill in all the fields.",
      });
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format", {
        description: "Please enter a valid email address.",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.VITE_API_URL}/user/login`,
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("userid", response.data.user.id);
      if (response.data.user.role === "ADMIN") {
        toast.success("Admin logged in successfully!");
        router.push("/admin");
      } else {
        toast.success("Logged in successfully!");
        router.push("/user");
      }
    } catch (_error) {
      toast.error("Имэйл эсвэл Нууц үг буруу байна.");
      console.log(email, password, _error);
    }
  };
  return (
    <div className="flex items-center justify-end h-[70vh] ">
      <div className="mx-auto flex flex-col gap-4 border p-10 rounded-lg bg-white shadow-lg dark:bg-gray-900">
        <p className="flex w-full justify-center items-center text-2xl">
          Login
        </p>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => handleLogin()}>Login</Button>
        <Button onClick={() => handleRegister()} variant="outline">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Login;
