"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { RotatingText } from "@/components/motion/RotatingText";
import { CountUp } from "@/components/motion/CountUp";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

export function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const h = dict.hero;
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* background: grid + animated aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora animate-aurora left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 bg-violet-glow/20" />
        <div
          className="aurora animate-aurora right-[2%] top-[18%] h-[380px] w-[380px] bg-cyan-glow/15"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="aurora animate-aurora left-[6%] top-[40%] h-[320px] w-[320px] bg-fuchsia-500/10"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      <div className="container-bx">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={item} className="mb-6 flex justify-center">
            <span className="tag-pill">
              <Sparkles size={13} className="text-cyan-glow" />
              {h.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-7xl"
          >
            <span className="block text-white">{h.lead}</span>
            <span className="mt-1 block">
              <RotatingText words={h.rotating} className="font-semibold" />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/60"
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href={`/${lang}/contact`} className="btn-primary group w-full sm:w-auto">
              {h.ctaPrimary}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href={`/${lang}/products`} className="btn-ghost w-full sm:w-auto">
              {h.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>

        {/* Product visual */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <HeroVisual dict={dict} />
        </motion.div>

        {/* stat row */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { v: h.stat1, l: h.stat1Label },
            { v: h.stat2, l: h.stat2Label },
            { v: h.stat3, l: h.stat3Label },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl font-semibold text-white md:text-4xl">
                <CountUp value={s.v} />
              </div>
              <div className="mt-1 text-sm text-white/45">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ dict }: { dict: Dictionary }) {
  const products = dict.products.items;
  const reduce = useReducedMotion();
  const bars = [40, 65, 50, 80, 60, 95, 72, 88];

  return (
    <SpotlightCard className="glass relative overflow-hidden rounded-3xl p-2 shadow-card" tilt={!reduce}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="rounded-[18px] border border-white/[0.06] bg-ink-950/60 p-5 md:p-7">
        {/* top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white/10" />
            <span className="h-3 w-3 rounded-full bg-white/10" />
            <span className="h-3 w-3 rounded-full bg-white/10" />
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/40">
            beyond-expertise.com / console
          </div>
          <div className="h-3 w-12" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* main panel */}
          <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-violet-glow/[0.08] to-transparent p-5 md:col-span-2">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Sparkles size={13} className="text-cyan-glow" />
              {products[0].name} · {products[0].category}
            </div>
            <div className="mt-4 space-y-2.5">
              <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
              <div className="h-2.5 w-full rounded-full bg-white/[0.07]" />
              <div className="h-2.5 w-5/6 rounded-full bg-white/[0.07]" />
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-glow" />
              <span className="h-2 w-28 rounded-full bg-white/20" />
            </div>
            {/* bars chart */}
            <div className="mt-6 flex h-24 items-end gap-2">
              {bars.map((v, i) => (
                <motion.div
                  key={i}
                  className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-violet-glow/40 to-cyan-glow/70"
                  style={{ height: `${v}%` }}
                  initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </div>

          {/* side cards */}
          <div className="flex flex-col gap-4">
            {products.slice(1, 4).map((p, i) => (
              <motion.div
                key={p.name}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-sm font-medium text-white">{p.name}</div>
                <div className="mt-1 text-[11px] text-white/40">{p.category}</div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-brand-gradient"
                    initial={reduce ? { width: "66%" } : { width: 0 }}
                    whileInView={{ width: "66%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
