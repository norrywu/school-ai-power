"use client";

import * as React from "react";
import { MoonIcon, SunIcon, LaptopIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-36 p-1">
        <div className="flex flex-col gap-1">
          <Button
            variant={theme === "light" ? "secondary" : "ghost"}
            size="sm"
            className="justify-start gap-2 text-xs"
            onClick={() => setTheme("light")}
          >
            <SunIcon className="h-4 w-4" /> Light
          </Button>
          <Button
            variant={theme === "dark" ? "secondary" : "ghost"}
            size="sm"
            className="justify-start gap-2 text-xs"
            onClick={() => setTheme("dark")}
          >
            <MoonIcon className="h-4 w-4" /> Dark
          </Button>
          <Button
            variant={theme === "system" ? "secondary" : "ghost"}
            size="sm"
            className="justify-start gap-2 text-xs"
            onClick={() => setTheme("system")}
          >
            <LaptopIcon className="h-4 w-4" /> System
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
