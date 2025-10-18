"use client";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure both passwords are the same.",
      });
      return;
    } else if (!email || !password || !name || !number) {
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
    try {
      await axios.post(
        `${process.env.VITE_API_URL + "/user"}||http://localhost:8000/user`,
        {
          email: email,
          password: password,
          name: name,
          number: number,
        }
      );

      toast.success("Registered successfully!");
      router.push("/login");
    } catch (_err) {
      console.log(_err);
      toast.error("user not found!");
    }
  };

  return (
    <div className="flex items-center justify-end h-[70vh]">
      <div className="mx-auto flex flex-col gap-4 border p-10 rounded-lg bg-white shadow-lg dark:bg-gray-900">
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
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Phone Number"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
