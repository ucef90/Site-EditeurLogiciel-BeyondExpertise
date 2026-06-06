"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { HeroV3 } from "@/components/sections/HeroV3";
import { HeroV4 } from "@/components/sections/HeroV4";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

type Mode = "v3" | "v4"; // v3 = dark, v4 = light
const STORAGE_KEY = "bx-hero-version";

/**
 * Home hero with a light/dark mode switch.
 *   v4 = light mode  ·  v3 = dark mode
 * The choice is persisted in localStorage and applied site-wide via
 * VersionTheme (data-theme). Defaults to v4 (light).
 */
export function HeroSwitcher({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [mode, setMode] = useState<Mode>("v4");

  // hydrate from localStorage (normalize any legacy v1/v2 value to light)
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setMode(saved === "v3" ? "v3" : "v4");
  }, []);

  // expose on <html> so global CSS hides the site header on the home hero
  useEffect(() => {
    document.documentElement.setAttribute("data-hero", mode);
    return () => document.documentElement.removeAttribute("data-hero");
  }, [mode]);

  const choose = (m: Mode) => {
    setMode(m);
    window.localStorage.setItem(STORAGE_KEY, m);
    // let VersionTheme (in the layout) re-apply data-theme immediately
    window.dispatchEvent(new Event("bx-version"));
  };

  const isLight = mode === "v4";

  return (
    <>
      {isLight ? <HeroV4 dict={dict} lang={lang} /> : <HeroV3 dict={dict} lang={lang} />}

      {/* light / dark switch */}
      <div
        role="group"
        aria-label="Theme"
        className="fixed left-1/2 top-[4.5rem] z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-ink-950/80 p-1 shadow-card backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => choose("v3")}
          aria-pressed={!isLight}
          aria-label="Dark mode"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            !isLight ? "text-white" : "text-white/45 hover:text-white/80"
          }`}
          style={!isLight ? { backgroundColor: "#13f000", color: "#06270a" } : undefined}
        >
          <Moon size={15} />
        </button>
        <button
          type="button"
          onClick={() => choose("v4")}
          aria-pressed={isLight}
          aria-label="Light mode"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            isLight ? "text-white" : "text-white/45 hover:text-white/80"
          }`}
          style={isLight ? { backgroundColor: "#0E8F3C", color: "#fff" } : undefined}
        >
          <Sun size={15} />
        </button>
      </div>
    </>
  );
}
