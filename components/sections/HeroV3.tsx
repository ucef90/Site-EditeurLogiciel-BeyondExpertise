"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

// Spline 3D scene, lazy-loaded so it never blocks initial paint.
const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE = "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";

/**
 * HeroV3 — Beyond Expertise content over an embedded Spline 3D background.
 * Keeps the v3 aesthetic (Sora font, vivid-green accent scoped via `.theme-v3`,
 * floating navbar, bottom-left content) but uses the real bilingual v1 copy.
 * The global site header is hidden while this version is active
 * (see `[data-hero="v3"] .site-header` in globals.css).
 */
export function HeroV3({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <div className="theme-v3 font-sora min-h-screen bg-hero-bg text-foreground antialiased">
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
      <Link href={`/${lang}`} aria-label="Beyond Expertise">
        <Logo />
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <LanguageSwitcher lang={lang} />
        <Link
          href={`/${lang}/contact`}
          className="rounded-lg bg-nav-button px-6 py-2.5 text-xs uppercase tracking-widest text-foreground transition-all hover:bg-nav-button/80 active:scale-[0.97]"
        >
          {dict.nav.demo}
        </Link>
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
    <section className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
          <Spline scene={SPLINE_SCENE} className="h-full w-full" />
        </Suspense>
      </div>

      {/* readability overlays — darken left & bottom where the content sits */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

      {/* content (bottom-left). pointer-events-none so the Spline scene
          stays interactive; interactive elements re-enable pointer events. */}
      <div className="pointer-events-none relative z-10 w-full max-w-[90%] px-6 pb-12 pt-32 sm:max-w-lg md:px-10 md:pb-16 lg:max-w-3xl">
        {/* badge */}
        <div
          className="mb-5 inline-flex animate-fade-up-3 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground opacity-0 backdrop-blur-sm"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
          {h.badge}
        </div>

        {/* heading: lead + rotating word */}
        <h1
          className="mb-4 animate-fade-up-3 text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em] text-foreground opacity-0 md:mb-6"
          style={{ animationDelay: "0.25s" }}
        >
          {h.lead}{" "}
          <RotatingWord words={h.rotating} />
        </h1>

        {/* subtitle */}
        <p
          className="mb-7 max-w-xl animate-fade-up-3 text-[clamp(0.95rem,1.6vw,1.25rem)] font-light leading-relaxed text-muted-foreground opacity-0 md:mb-9"
          style={{ animationDelay: "0.4s" }}
        >
          {h.subtitle}
        </p>

        {/* CTAs */}
        <div
          className="flex animate-fade-up-3 flex-wrap items-center gap-3 opacity-0"
          style={{ animationDelay: "0.55s" }}
        >
          <Link
            href={`/${lang}/contact`}
            className="group pointer-events-auto inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97]"
          >
            {h.ctaPrimary}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={`/${lang}/products`}
            className="pointer-events-auto inline-flex items-center rounded-md border border-white/20 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/[0.08] active:scale-[0.97]"
          >
            {h.ctaSecondary}
          </Link>
        </div>

        {/* stats */}
        <div
          className="mt-9 flex animate-fade-up-3 flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6 opacity-0 md:mt-12"
          style={{ animationDelay: "0.7s" }}
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
      <div className="text-2xl font-semibold leading-none text-foreground md:text-3xl">
        {hasPlus && <span className="text-primary">+</span>}
        {number}
      </div>
      <div className="mt-1.5 max-w-[180px] text-xs font-light leading-tight text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/** Left-aligned rotating word in the accent (green) color. */
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
    <span className="relative inline-block align-bottom text-primary">
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
