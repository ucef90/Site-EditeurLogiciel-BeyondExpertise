import Link from "next/link";
import {
  Sparkles,
  BarChart3,
  Workflow,
  ShieldCheck,
  Check,
  Truck,
  Landmark,
  HeartPulse,
  Factory,
  ShoppingBag,
  Users,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../motion/SpotlightCard";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

// one fitting icon per product (Nova, Atlas, Orchestra, Vault, Flux, Ledger,
// Pulse, Forge, Prism, Helix)
const icons = [
  Sparkles,
  BarChart3,
  Workflow,
  ShieldCheck,
  Truck,
  Landmark,
  HeartPulse,
  Factory,
  ShoppingBag,
  Users,
];
const accents = [
  "from-violet-glow/20",
  "from-cyan-glow/20",
  "from-fuchsia-500/20",
  "from-emerald-400/20",
  "from-sky-400/20",
  "from-amber-400/20",
  "from-rose-400/20",
  "from-teal-400/20",
  "from-indigo-400/20",
  "from-lime-400/20",
];

export function Products({
  dict,
  lang,
  withHeader = true,
}: {
  dict: Dictionary;
  lang: Locale;
  withHeader?: boolean;
}) {
  const { products } = dict;
  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="container-bx">
        {withHeader && (
          <SectionHeader tag={products.tag} title={products.title} subtitle={products.subtitle} />
        )}

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {products.items.map((p, i) => {
            const Icon = icons[i % icons.length];
            const href = p.external ? p.url : `/${lang}/products/${p.slug}`;
            const card = (
              <SpotlightCard className="card-bx group h-full overflow-hidden">
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${
                    accents[i % accents.length]
                  } to-transparent blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-wider text-white/45">
                    {p.category}
                  </span>
                </div>

                <h3 className="relative mt-6 flex items-center gap-2 font-display text-2xl font-semibold text-white">
                  {p.name}
                  {p.external ? (
                    <ArrowUpRight
                      size={18}
                      className="text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-glow"
                    />
                  ) : (
                    <ArrowRight
                      size={18}
                      className="text-white/30 transition-all group-hover:translate-x-1 group-hover:text-cyan-glow"
                    />
                  )}
                </h3>
                <p className="relative mt-1 text-sm font-medium text-cyan-glow/80">{p.tagline}</p>
                <p className="relative mt-3 text-sm leading-relaxed text-white/55">{p.description}</p>

                <ul className="relative mt-5 grid grid-cols-2 gap-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                      <Check size={13} className="shrink-0 text-cyan-glow" />
                      {f}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-glow/80">
                  {p.external ? products.detail.visit : dict.cta.learnMore}
                  {p.external ? <ArrowUpRight size={13} /> : <ArrowRight size={13} />}
                </span>
              </SpotlightCard>
            );

            return (
              <Reveal key={p.name} delay={i * 80}>
                {p.external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                    aria-label={`${p.name} — ${products.detail.visit}`}
                  >
                    {card}
                  </a>
                ) : (
                  <Link href={href} className="block h-full" aria-label={p.name}>
                    {card}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
