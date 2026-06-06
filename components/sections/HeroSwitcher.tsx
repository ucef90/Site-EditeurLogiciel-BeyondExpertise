"use client";

import { useEffect, useState } from "react";
import { HeroV3 } from "@/components/sections/HeroV3";
import { HeroV4 } from "@/components/sections/HeroV4";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

type Mode = "v3" | "v4"; // v3 = dark, v4 = light
const STORAGE_KEY = "bx-hero-version";

/**
 * Home hero in light (v4) or dark (v3) mode. The light/dark switch lives in the
 * navbar (ThemeToggle); this component just renders the matching hero and stays
 * in sync via the "bx-version" event. Defaults to v4 (light).
 */
export function HeroSwitcher({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [mode, setMode] = useState<Mode>("v4");

  // hydrate + react to the navbar toggle / other tabs
  useEffect(() => {
    const sync = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      setMode(saved === "v3" ? "v3" : "v4");
    };
    sync();
    window.addEventListener("bx-version", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bx-version", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // expose on <html> so global CSS hides the site header on the home hero
  useEffect(() => {
    document.documentElement.setAttribute("data-hero", mode);
    return () => document.documentElement.removeAttribute("data-hero");
  }, [mode]);

  return mode === "v4" ? <HeroV4 dict={dict} lang={lang} /> : <HeroV3 dict={dict} lang={lang} />;
}
