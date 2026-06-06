"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { HeroV2 } from "@/components/sections/HeroV2";
import { HeroV3 } from "@/components/sections/HeroV3";
import { HeroV4 } from "@/components/sections/HeroV4";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

type Version = "v1" | "v2" | "v3" | "v4";
const VERSIONS: Version[] = ["v1", "v2", "v3", "v4"];
const STORAGE_KEY = "bx-hero-version";

/**
 * Renders the home hero in one of three versions and exposes a small floating
 * switch to compare them live.
 *   v1 = original Beyond Expertise hero
 *   v2 = premium futuristic hero (purple, glass star)
 *   v3 = futuristic hero (green, Spline 3D, dark)
 *   v4 = light-mode transformation of v3 (warm off-white, emerald)
 * The choice is persisted in localStorage. Defaults to v4 (newest).
 */
export function HeroSwitcher({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [version, setVersion] = useState<Version>("v4");

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
    // let VersionTheme (mounted in the layout) re-apply data-theme immediately
    window.dispatchEvent(new Event("bx-version"));
  };

  return (
    <>
      {version === "v4" ? (
        <HeroV4 dict={dict} lang={lang} />
      ) : version === "v3" ? (
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
              style={
                active
                  ? {
                      backgroundColor: { v1: "#5E0ED7", v2: "#5E0ED7", v3: "#13f000", v4: "#0E8F3C" }[v],
                      color: "#fff",
                    }
                  : undefined
              }
            >
              {v}
            </button>
          );
        })}
      </div>
    </>
  );
}
