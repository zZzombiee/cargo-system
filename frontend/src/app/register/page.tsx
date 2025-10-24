"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const { register, loading, user } = useUser();
  const [form, setForm] = useState({
    email: "",
    name: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  const toggleShowPassword = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleRegister = async () => {
    const { email, name, number, password, confirmPassword } = form;

    if (!email || !name || !number || !password || !confirmPassword)
      return toast.error("Please fill in all fields");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email format");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(number))
      return toast.error("Invalid phone number format");

    const normalizedEmail = email.trim().toLowerCase();

    await register({ email, name, number, password: normalizedEmail });
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="mx-auto flex flex-col gap-4 border p-10 rounded-lg bg-white shadow-lg dark:bg-gray-900 ">
        <h1 className="text-2xl text-center font-semibold">Register</h1>

        {Object.keys(form).map((key) => {
          const field = key as keyof typeof form;
          const isPassword = key.toLowerCase().includes("password");

          return (
            <div key={key} className="relative">
              <Input
                placeholder={
                  key === "confirmPassword"
                    ? "Confirm Password"
                    : key.charAt(0).toUpperCase() + key.slice(1)
                }
                type={
                  isPassword
                    ? showPassword[field as "password" | "confirmPassword"]
                      ? "text"
                      : "password"
                    : key === "email"
                    ? "email"
                    : "text"
                }
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />

              {isPassword && (
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    toggleShowPassword(field as "password" | "confirmPassword")
                  }
                >
                  {showPassword[field as "password" | "confirmPassword"] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          );
        })}

        <Button onClick={handleRegister} disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
        <Button onClick={() => router.push("/login")} variant="outline">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Register;
