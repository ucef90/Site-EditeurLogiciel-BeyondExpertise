"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "bx-hero-version";
type Mode = "v3" | "v4"; // v3 = dark, v4 = light

/**
 * Compact light/dark switch designed to live inside the navbar.
 * Self-contained: it reads/writes the chosen mode in localStorage and emits a
 * "bx-version" event so the hero (HeroSwitcher) and the page theme
 * (VersionTheme) update in sync. Its neutral classes auto-adapt to the active
 * theme via the data-theme overrides; the selected side gets the accent colour.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("v4");

  useEffect(() => {
    const sync = () => {
      const s = window.localStorage.getItem(STORAGE_KEY);
      setMode(s === "v3" ? "v3" : "v4");
    };
    sync();
    window.addEventListener("bx-version", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bx-version", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const choose = (m: Mode) => {
    if (m === mode) return;
    window.localStorage.setItem(STORAGE_KEY, m);
    setMode(m);
    window.dispatchEvent(new Event("bx-version"));
  };

  const isLight = mode === "v4";

  return (
    <div
      role="group"
      aria-label="Theme"
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 backdrop-blur-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => choose("v3")}
        aria-pressed={!isLight}
        aria-label="Dark mode"
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          !isLight ? "" : "text-white/45 hover:text-white/80"
        }`}
        style={!isLight ? { backgroundColor: "#16e23a", color: "#04210d" } : undefined}
      >
        <Moon size={14} />
      </button>
      <button
        type="button"
        onClick={() => choose("v4")}
        aria-pressed={isLight}
        aria-label="Light mode"
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          isLight ? "" : "text-white/45 hover:text-white/80"
        }`}
        style={isLight ? { backgroundColor: "#0E8F3C", color: "#ffffff" } : undefined}
      >
        <Sun size={14} />
      </button>
    </div>
  );
}
