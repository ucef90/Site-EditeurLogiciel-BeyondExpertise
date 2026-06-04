import Link from "next/link";
import {
  Brain,
  Workflow,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Truck,
  Landmark,
  HeartPulse,
  ShoppingBag,
  Quote,
  Check,
} from "lucide-react";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../Reveal";
import { Marquee } from "../motion/Marquee";
import { CountUp } from "../motion/CountUp";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

/* ---------------- Logo bar ---------------- */
export function LogoBar({ dict }: { dict: Dictionary }) {
  const names = ["NORDA", "Lumenis", "Vectra", "Helios", "Quantor", "Meridian", "Abuilt", "Solmaris"];
  const keywords = [
    ...dict.products.items.map((p) => p.name),
    ...dict.capabilities.items.map((c) => c.title),
  ];
  return (
    <section className="overflow-hidden border-y border-white/[0.06] py-12">
      <div className="container-bx">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-white/35">
          {dict.logos.title}
        </p>
      </div>

      <Marquee className="mt-8" speed={42}>
        {names.map((n) => (
          <span
            key={n}
            className="font-display text-2xl font-semibold text-white/20 transition-colors hover:text-white/60"
          >
            {n}
          </span>
        ))}
      </Marquee>

      <Marquee className="mt-5" speed={34} reverse>
        {keywords.map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-sm text-white/45"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow/70" />
            {k}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ---------------- Shift ---------------- */
export function Shift({ dict }: { dict: Dictionary }) {
  const s = dict.shift;
  const points = [
    { t: s.point1Title, b: s.point1Body },
    { t: s.point2Title, b: s.point2Body },
    { t: s.point3Title, b: s.point3Body },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-bx grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="tag-pill mb-4">{s.tag}</span>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {s.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/55">{s.body}</p>
        </Reveal>
        <div className="space-y-4">
          {points.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <div className="card-bx flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{p.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{p.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Capabilities ---------------- */
export function Capabilities({ dict }: { dict: Dictionary }) {
  const c = dict.capabilities;
  const icons = [Brain, Workflow, BarChart3, ShieldCheck];
  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-glow/10 blur-[140px]" />
      <div className="container-bx">
        <SectionHeader tag={c.tag} title={c.title} subtitle={c.subtitle} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 70}>
                <div className="card-bx h-full">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon size={22} className="text-cyan-glow" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
export function HowItWorks({ dict }: { dict: Dictionary }) {
  const h = dict.how;
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-bx">
        <SectionHeader tag={h.tag} title={h.title} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {h.steps.map((step, i) => (
            <Reveal key={step.step} delay={i * 90}>
              <div className="card-bx h-full">
                <div className="font-display text-5xl font-bold accent-text">{step.step}</div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */
export function Industries({ dict }: { dict: Dictionary }) {
  const ind = dict.industries;
  const icons = [Truck, Landmark, HeartPulse, ShoppingBag];
  return (
    <section id="industries" className="relative py-24 md:py-32">
      <div className="container-bx">
        <SectionHeader tag={ind.tag} title={ind.title} subtitle={ind.subtitle} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ind.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.name} delay={i * 70}>
                <div className="card-bx group h-full">
                  <Icon size={26} className="text-white/80 transition-colors group-hover:text-cyan-glow" />
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
export function Stats({ dict }: { dict: Dictionary }) {
  const s = dict.stats;
  return (
    <section className="relative py-20">
      <div className="container-bx">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-12 md:px-12">
            <div className="pointer-events-none absolute inset-0 bg-brand-radial" />
            <div className="relative grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {s.items.map((item) => (
                <div key={item.label}>
                  <div className="font-display text-4xl font-bold gradient-text md:text-5xl">
                    <CountUp value={item.value} />
                  </div>
                  <div className="mt-2 text-sm text-white/55">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonial ---------------- */
export function Testimonial({ dict }: { dict: Dictionary }) {
  const t = dict.testimonial;
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-bx">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Quote size={40} className="mx-auto text-violet-glow/60" />
          <p className="mt-6 text-balance font-display text-2xl font-medium leading-snug text-white md:text-3xl">
            “{t.quote}”
          </p>
          <div className="mt-6 text-sm text-white/55">
            <span className="font-semibold text-white">{t.author}</span> — {t.role}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Trust highlight ---------------- */
export function TrustHighlight({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.trust;
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-bx grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="tag-pill mb-4">{t.tag}</span>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/55">{t.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {t.badges.map((b) => (
              <span
                key={b}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/70"
              >
                {b}
              </span>
            ))}
          </div>
          <Link
            href={`/${lang}/trust`}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-glow hover:text-white"
          >
            {dict.cta.learnMore}
            <ArrowRight size={15} />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <ul className="space-y-4">
            {t.points.map((p) => (
              <li key={p} className="card-bx flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient">
                  <Check size={16} className="text-white" />
                </span>
                <span className="text-sm text-white/75">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Resources ---------------- */
export function Resources({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const r = dict.resources;
  return (
    <section id="resources" className="relative py-24 md:py-32">
      <div className="container-bx">
        <SectionHeader tag={r.tag} title={r.title} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {r.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <Link
                href={`/${lang}#resources`}
                className="card-bx group flex h-full flex-col"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-cyan-glow/80">
                  {item.category}
                </span>
                <h3 className="mt-3 flex-1 font-display text-lg font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <div className="mt-5 flex items-center justify-between text-sm text-white/45">
                  <span>{item.readTime}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:text-cyan-glow"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
export function FinalCta({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const f = dict.finalCta;
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-bx">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-16 text-center md:px-12 md:py-24">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-glow/25 blur-[120px]" />
            <h2 className="relative mx-auto max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {f.title}
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/60">{f.subtitle}</p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={`/${lang}/contact`} className="btn-primary group">
                {f.ctaPrimary}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href={`/${lang}/contact`} className="btn-ghost">
                {f.ctaSecondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
