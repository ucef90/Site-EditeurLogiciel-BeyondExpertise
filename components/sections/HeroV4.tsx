"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

// Spline 3D scene, lazy-loaded so it never blocks initial paint.
const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE = "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";
const ACCENT = "#0E8F3C"; // refined emerald — AA contrast on light
const PAPER = "#F6F4EF"; // warm off-white
const INK = "#15161A"; // near-black charcoal

/**
 * HeroV4 — the LIGHT-mode transformation of v3.
 * Same layout/identity (Spline 3D, Sora, bilingual Beyond Expertise content)
 * but a premium "editorial luxury" light treatment: warm off-white base,
 * charcoal type, refined emerald accent, the 3D scene inverted to a light
 * cube field. Page-below sections are re-skinned via html[data-hero="v4"].
 */
export function HeroV4({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <div className="theme-v4 font-sora min-h-screen text-[#15161A]" style={{ backgroundColor: PAPER }}>
      <Navbar dict={dict} lang={lang} />
      <HeroSection dict={dict} lang={lang} />
    </div>
  );
}

function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const links = [
    { label: dict.nav.products, href: `/${lang}/products` },
    { label: dict.nav.solutions, href: `/${lang}/solutions` },
    { label: dict.nav.industries, href: `/${lang}#industries` },
    { label: dict.nav.company, href: `/${lang}/company` },
    { label: dict.nav.trust, href: `/${lang}/trust` },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-5 lg:px-16">
      <Link href={`/${lang}`} aria-label="Beyond Expertise" className="[&_span.text-white]:!text-[#15161A]">
        <Logo />
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm uppercase tracking-widest text-[#15161A]/55 transition-colors hover:text-[#15161A]"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher lang={lang} />
          <Link
            href={`/${lang}/contact`}
            className="rounded-lg px-6 py-2.5 text-xs uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-[0.97]"
            style={{ backgroundColor: ACCENT }}
          >
            {dict.nav.demo}
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const h = dict.hero;
  const stats = [
    { value: h.stat1, label: h.stat1Label },
    { value: h.stat2, label: h.stat2Label },
    { value: h.stat3, label: h.stat3Label },
  ];

  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden" style={{ backgroundColor: PAPER }}>
      {/* Spline 3D background, inverted into a light cube field */}
      <div className="absolute inset-0 [filter:invert(1)_hue-rotate(180deg)]">
        <Suspense fallback={<div className="absolute inset-0" style={{ backgroundColor: PAPER }} />}>
          <Spline scene={SPLINE_SCENE} className="h-full w-full" />
        </Suspense>
      </div>

      {/* warm-white scrims for text legibility (content sits bottom-left) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: `linear-gradient(90deg, ${PAPER} 0%, ${PAPER}cc 32%, transparent 72%)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/3"
        style={{ background: `linear-gradient(to top, ${PAPER} 4%, ${PAPER}00 100%)` }}
      />

      {/* content (bottom-left) */}
      <div className="pointer-events-none relative z-10 w-full max-w-[90%] px-6 pb-12 pt-32 sm:max-w-lg md:px-10 md:pb-16 lg:max-w-3xl">
        {/* badge */}
        <div
          className="mb-5 inline-flex animate-fade-up-3 items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] opacity-0 backdrop-blur-sm"
          style={{ animationDelay: "0.15s", borderColor: "rgba(20,20,25,0.12)", color: "#52555C" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
          {h.badge}
        </div>

        {/* heading: lead + rotating word */}
        <h1
          className="mb-4 animate-fade-up-3 text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em] opacity-0 md:mb-6"
          style={{ animationDelay: "0.25s", color: INK }}
        >
          {h.lead} <RotatingWord words={h.rotating} />
        </h1>

        {/* subtitle */}
        <p
          className="mb-7 max-w-xl animate-fade-up-3 text-[clamp(0.95rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-0 md:mb-9"
          style={{ animationDelay: "0.4s", color: "#52555C" }}
        >
          {h.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex animate-fade-up-3 flex-wrap items-center gap-3 opacity-0" style={{ animationDelay: "0.55s" }}>
          <Link
            href={`/${lang}/contact`}
            className="group pointer-events-auto inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(14,143,60,0.6)] transition-all hover:brightness-110 active:scale-[0.97]"
            style={{ backgroundColor: ACCENT }}
          >
            {h.ctaPrimary}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={`/${lang}/products`}
            className="pointer-events-auto inline-flex items-center rounded-md border bg-white/60 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white active:scale-[0.97]"
            style={{ borderColor: "rgba(20,20,25,0.16)", color: INK }}
          >
            {h.ctaSecondary}
          </Link>
        </div>

        {/* stats */}
        <div
          className="mt-9 flex animate-fade-up-3 flex-wrap gap-x-8 gap-y-4 border-t pt-6 opacity-0 md:mt-12"
          style={{ animationDelay: "0.7s", borderColor: "rgba(20,20,25,0.12)" }}
        >
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const hasPlus = value.trim().startsWith("+");
  const number = hasPlus ? value.trim().slice(1) : value;
  return (
    <div>
      <div className="text-2xl font-semibold leading-none md:text-3xl" style={{ color: INK }}>
        {hasPlus && <span style={{ color: ACCENT }}>+</span>}
        {number}
      </div>
      <div className="mt-1.5 max-w-[180px] text-xs font-light leading-tight" style={{ color: "#6A6E76" }}>
        {label}
      </div>
    </div>
  );
}

/** Left-aligned rotating word in the accent (emerald) color. */
function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span className="relative inline-block align-bottom" style={{ color: ACCENT }}>
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {longest}
      </span>
      <span className="absolute inset-0 whitespace-nowrap">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="inline-block"
            initial={reduce ? false : { y: "0.4em", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={reduce ? undefined : { y: "-0.4em", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
