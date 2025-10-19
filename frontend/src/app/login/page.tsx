"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const { login, loading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");
    await login(email, password);
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
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
