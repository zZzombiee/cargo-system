"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      <Sun
        className="h-5 w-5 transition-all duration-300 
                   rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        className="absolute h-5 w-5 transition-all duration-300
                   rotate-90 scale-0 dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
};

export default ModeToggle;
