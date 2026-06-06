"use client";

import { useEffect } from "react";

const STORAGE_KEY = "bx-hero-version";
const DEFAULT = "v4"; // light
const VALID = ["v3", "v4"]; // v3 = dark, v4 = light

/**
 * Applies the selected hero version as `data-theme` on <html> for EVERY page,
 * so the chosen look (e.g. v3 green / v4 light) persists when navigating to
 * Products, Solutions, etc. — not just on the home hero.
 *
 * Mounted once in the root layout. It reacts to the version switch on the home
 * page (custom "bx-version" event) and to changes from other tabs ("storage").
 * The home-only header hiding stays keyed on `data-hero` (set by HeroSwitcher).
 */
export function VersionTheme() {
  useEffect(() => {
    const apply = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const v = saved && VALID.includes(saved) ? saved : DEFAULT;
      document.documentElement.setAttribute("data-theme", v);
    };
    apply();
    window.addEventListener("bx-version", apply);
    window.addEventListener("storage", apply);
    return () => {
      window.removeEventListener("bx-version", apply);
      window.removeEventListener("storage", apply);
    };
  }, []);

  return null;
}
