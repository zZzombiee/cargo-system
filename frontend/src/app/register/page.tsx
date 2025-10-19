"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

const Register = () => {
  const { register } = useUser();
  const [form, setForm] = useState({
    email: "",
    name: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    const { email, name, number, password, confirmPassword } = form;
    if (password !== confirmPassword) return alert("Passwords do not match");
    await register({ email, name, number, password });
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="mx-auto flex flex-col gap-4 border p-10 rounded-lg bg-white shadow-lg dark:bg-gray-900">
        <h1 className="text-2xl text-center">Register</h1>
        {Object.keys(form).map((key) => (
          <Input
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            type={
              key.includes("password")
                ? "password"
                : key === "email"
                ? "email"
                : "text"
            }
            value={form[key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </div>
  );
};

export default Register;
