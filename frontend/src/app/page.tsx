"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // fade-in effect
    setFade(true);

    // redirect after 2 seconds
    const timer = setTimeout(() => {
      router.push("/user");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className={` min-w-screen min-h-screen flex items-center justify-center bg-white text-2xl font-semibold transition-opacity duration-700 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="animate-pulse">Loading...</span>
      <div className="loader"></div>
    </div>
  );
};

export default Home;
