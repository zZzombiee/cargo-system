"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ Load saved email if "remember me" was checked previously
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(user.role === "ADMIN" ? "/admin" : "/user");
    }
  }, [router, user]);

  // ✅ Toggle password visibility
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // ✅ Handle login
  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail || !password)
      return toast.error("Please fill all fields");

    if (!emailRegex.test(normalizedEmail))
      return toast.error("Invalid email format");

    // Save or remove remembered email
    if (rememberMe) localStorage.setItem("rememberedEmail", normalizedEmail);
    else localStorage.removeItem("rememberedEmail");

    await login(normalizedEmail, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm flex flex-col gap-4 border p-8 rounded-2xl bg-white shadow-lg dark:bg-gray-900 dark:border-gray-800">
        <h1 className="text-3xl font-semibold text-center mb-2">Login</h1>

        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus-visible:ring-blue-500"
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10 focus-visible:ring-blue-500"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* ✅ Remember Me */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <span className="text-gray-600 dark:text-gray-300">
              Remember me
            </span>
          </label>

          <button
            className="text-blue-600 hover:underline"
            onClick={() => toast.info("Password reset coming soon")}
          >
            Forgot password?
          </button>
        </div>

        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>

        <Button
          onClick={() => router.push("/register")}
          variant="outline"
          className="mt-1"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Login;
