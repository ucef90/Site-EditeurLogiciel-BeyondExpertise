"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#5E0ED7";

/**
 * HeroV2 — premium futuristic full-screen hero.
 * Dark animated cube/tile background + central abstract glass-ribbon star +
 * luxury agency layout (uppercase typography, stats, slide-up heading).
 *
 * Integrates with the existing global <Header/> (no duplicate navbar) and keeps
 * all existing content/routing intact. Accent: #5E0ED7.
 */
export function HeroV2({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const reduce = useReducedMotion();
  const v2 = dict.heroV2;
  const h = dict.hero;

  const stats = [
    { value: h.stat1, label: h.stat1Label },
    { value: h.stat2, label: h.stat2Label },
    { value: h.stat3, label: h.stat3Label },
  ];

  const fadeUp: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 32 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
    }),
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[hsl(var(--hero-bg))] text-white">
      {/* ---------- animated cube/tile background ---------- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-cubes absolute inset-0 animate-cube-pan" />
      </div>
      {/* readability + purple-accent overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />
      <div className="pointer-events-none absolute inset-0 z-[2] animate-glow-pulse bg-[radial-gradient(circle_at_center,rgba(94,14,215,0.24),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* ---------- central abstract glass-ribbon star ---------- */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] z-10 w-[78vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 sm:w-[60vw] md:w-[52vw] lg:w-[44vw]"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: -6 }}
        animate={
          reduce
            ? { opacity: 1 }
            : {
                opacity: 1,
                scale: [1, 1.04, 1],
                y: [0, -18, 0],
                rotate: [-4, 4, -4],
              }
        }
        transition={
          reduce
            ? { duration: 0.8 }
            : {
                opacity: { duration: 0.8 },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <GlassStar className="h-auto w-full drop-shadow-[0_0_60px_rgba(94,14,215,0.45)]" />
      </motion.div>

      {/* ---------- stats row (upper-right) ---------- */}
      <div className="relative z-20 flex flex-1 items-start justify-end px-5 pt-24 sm:px-8 md:px-12 md:pt-28">
        <div className="flex gap-5 text-right sm:gap-8 md:gap-10">
          {stats.map((s, i) => (
            <StatItem key={s.label} value={s.value} label={s.label} custom={i + 2} variants={fadeUp} />
          ))}
        </div>
      </div>

      {/* ---------- bottom content ---------- */}
      <div className="relative z-20 flex flex-col gap-6 px-5 pb-10 sm:px-8 md:gap-12 md:px-12 md:pb-12">
        {/* row A — tagline + CTA */}
        <div className="flex items-center justify-between gap-4">
          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-[130px] whitespace-pre-line text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-white/80 sm:max-w-[160px] sm:text-xs md:max-w-xs md:text-sm"
          >
            {v2.tagline}
          </motion.p>

          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show">
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 whitespace-nowrap text-base font-semibold uppercase tracking-wide transition-opacity hover:opacity-80 sm:text-xl md:text-2xl"
              style={{ color: ACCENT }}
            >
              {v2.cta}
              <ArrowUpRight className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </Link>
          </motion.div>
        </div>

        {/* row B — description + main heading */}
        <div className="flex items-end justify-between gap-3 sm:gap-4">
          <motion.p
            custom={7}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="w-[120px] shrink-0 text-left text-[9px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/65 sm:w-[180px] sm:text-xs md:w-[280px] md:text-right md:text-sm"
          >
            {v2.description}
          </motion.p>

          <AnimatedHeading words={v2.heading} reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */

function StatItem({
  value,
  label,
  custom,
  variants,
}: {
  value: string;
  label: string;
  custom: number;
  variants: Variants;
}) {
  // render a leading "+" in the accent color, the rest in white
  const hasPlus = value.trim().startsWith("+");
  const number = hasPlus ? value.trim().slice(1) : value;

  return (
    <motion.div custom={custom} variants={variants} initial="hidden" animate="show" className="text-right">
      <div
        className="whitespace-nowrap font-semibold leading-none text-white"
        style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)" }}
      >
        {hasPlus && (
          <span style={{ color: ACCENT, fontSize: "0.5em", verticalAlign: "super" }}>+</span>
        )}
        {number}
      </div>
      <div className="mt-1 max-w-[120px] text-[10px] uppercase leading-tight tracking-[0.16em] text-white/70 sm:text-xs md:text-sm">
        {label}
      </div>
    </motion.div>
  );
}

function AnimatedHeading({ words, reduce }: { words: string[]; reduce: boolean }) {
  return (
    <h1
      className="text-right font-semibold uppercase leading-[0.88] tracking-[-0.04em] text-white"
      style={{ fontSize: "clamp(2rem, 9vw, 9rem)" }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduce ? { y: 0 } : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: reduce ? 0 : 0.4 + i * 0.14, duration: 0.7, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/**
 * Abstract glass / ribbon four-point star — a premium 3D-looking object
 * rendered entirely in SVG (no external asset required). Purple glass with
 * white specular highlights, designed to blend on a dark background.
 */
function GlassStar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hv2-core" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#C8A8FF" />
          <stop offset="38%" stopColor="#7B3CF0" />
          <stop offset="78%" stopColor="#5E0ED7" />
          <stop offset="100%" stopColor="#2A0566" />
        </radialGradient>
        <linearGradient id="hv2-ribbon" x1="60" y1="40" x2="340" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9D6BFF" />
          <stop offset="0.5" stopColor="#5E0ED7" />
          <stop offset="1" stopColor="#3A0A8C" />
        </linearGradient>
        <linearGradient id="hv2-spec" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="hv2-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* soft halo */}
      <circle cx="200" cy="200" r="150" fill="url(#hv2-core)" opacity="0.28" filter="url(#hv2-blur)" />

      {/* outer four-point star ribbon */}
      <path
        d="M200 24
           C214 110 290 186 376 200
           C290 214 214 290 200 376
           C186 290 110 214 24 200
           C110 186 186 110 200 24 Z"
        fill="url(#hv2-ribbon)"
        opacity="0.92"
      />
      {/* rotated inner star for depth */}
      <path
        d="M200 70
           C209 150 250 191 330 200
           C250 209 209 250 200 330
           C191 250 150 209 70 200
           C150 191 191 150 200 70 Z"
        fill="url(#hv2-core)"
      />
      {/* glassy specular highlight */}
      <path
        d="M200 24
           C214 110 290 186 376 200
           C300 200 232 150 200 70
           C190 90 195 60 200 24 Z"
        fill="url(#hv2-spec)"
        opacity="0.55"
      />
      {/* bright core */}
      <circle cx="186" cy="172" r="42" fill="#E9DBFF" opacity="0.85" filter="url(#hv2-blur)" />
      {/* rim light */}
      <path
        d="M200 24 C214 110 290 186 376 200"
        stroke="#D9C2FF"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
