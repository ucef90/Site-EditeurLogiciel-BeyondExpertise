"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { HeroV2 } from "@/components/sections/HeroV2";
import { HeroV3 } from "@/components/sections/HeroV3";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

type Version = "v1" | "v2" | "v3";
const VERSIONS: Version[] = ["v1", "v2", "v3"];
const STORAGE_KEY = "bx-hero-version";

/**
 * Renders the home hero in one of three versions and exposes a small floating
 * switch to compare them live.
 *   v1 = original Beyond Expertise hero
 *   v2 = premium futuristic hero (purple, glass star)
 *   v3 = "Sentinel AI" security hero (green, Spline 3D)
 * The choice is persisted in localStorage. Defaults to v3 (newest).
 */
export function HeroSwitcher({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [version, setVersion] = useState<Version>("v3");

  // hydrate from localStorage after mount (SSR renders the default first)
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Version | null;
    if (saved && VERSIONS.includes(saved)) setVersion(saved);
  }, []);

  // expose the active version on <html> so global CSS can react
  // (e.g. hide the site header for v3's standalone navbar)
  useEffect(() => {
    document.documentElement.setAttribute("data-hero", version);
    return () => document.documentElement.removeAttribute("data-hero");
  }, [version]);

  const choose = (v: Version) => {
    setVersion(v);
    window.localStorage.setItem(STORAGE_KEY, v);
  };

  return (
    <>
      {version === "v3" ? (
        <HeroV3 dict={dict} lang={lang} />
      ) : version === "v2" ? (
        <HeroV2 dict={dict} lang={lang} />
      ) : (
        <Hero dict={dict} lang={lang} />
      )}

      {/* floating version switch */}
      <div
        role="group"
        aria-label="Hero version"
        className="fixed left-1/2 top-[4.5rem] z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-ink-950/80 p-1 text-xs font-semibold uppercase tracking-widest shadow-card backdrop-blur-xl"
      >
        {VERSIONS.map((v) => {
          const active = version === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => choose(v)}
              aria-pressed={active}
              className={`rounded-full px-4 py-1.5 transition-colors ${
                active ? "text-white" : "text-white/55 hover:text-white/80"
              }`}
              style={active ? { backgroundColor: v === "v3" ? "#13f000" : "#5E0ED7" } : undefined}
            >
              {v}
            </button>
          );
        })}
      </div>
    </>
  );
}
