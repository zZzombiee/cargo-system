"use client";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure both passwords are the same.",
      });
      return;
    } else if (!email || !password) {
      toast.error("Email and password are required", {
        description: "Please fill in all the fields.",
      });
      return;
    } else if (password.length < 6) {
      toast.error("Password too short", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    toast.success("Registered successfully!");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto flex flex-col gap-4 border p-10 rounded-lg bg-white shadow-lg">
        <p className="flex w-full justify-center items-center text-2xl">
          Register
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
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={() => handleRegister()}>Register</Button>
      </div>
    </div>
  );
};
export default Register;
