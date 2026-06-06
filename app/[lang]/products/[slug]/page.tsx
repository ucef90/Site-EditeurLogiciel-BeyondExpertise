import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
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
  Briefcase,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, type Locale } from "@/i18n/config";
import { Reveal } from "@/components/Reveal";
import { FinalCta } from "@/components/sections/HomeSections";

const ICONS: Record<string, LucideIcon> = {
  nova: Sparkles,
  atlas: BarChart3,
  orchestra: Workflow,
  vault: ShieldCheck,
  flux: Truck,
  ledger: Landmark,
  pulse: HeartPulse,
  forge: Factory,
  prism: ShoppingBag,
  helix: Users,
  scorify: Briefcase,
};

export async function generateStaticParams() {
  const { default: en } = await import("@/i18n/dictionaries/en.json");
  return locales.flatMap((lang) =>
    en.products.items.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const p = dict.products.items.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.name} — Beyond Expertise`, description: p.overview };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  const dict = await getDictionary(params.lang);
  const p = dict.products.items.find((x) => x.slug === params.slug);
  if (!p) notFound();

  const d = dict.products.detail;
  const Icon = ICONS[p.slug] ?? Sparkles;

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute left-1/2 top-[-20%] h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-violet-glow/15 blur-[130px]" />
        </div>
        <div className="container-bx">
          <Link
            href={`/${params.lang}/products`}
            className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} />
            {d.back}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon size={22} className="text-white" />
                </span>
                <span className="tag-pill">{p.category}</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-white md:text-7xl">
                {p.name}
              </h1>
              <p className="mt-3 text-xl font-medium text-cyan-glow/80 md:text-2xl">{p.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${params.lang}/contact`} className="btn-primary group">
                  {d.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                {p.external && p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
                    {d.visit}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )}
              </div>
            </div>

            {/* overview card */}
            <div className="glass rounded-3xl p-7 shadow-card">
              <h2 className="text-xs uppercase tracking-[0.18em] text-white/45">{d.overviewTitle}</h2>
              <p className="mt-4 text-pretty leading-relaxed text-white/70">{p.overview}</p>
            </div>
          </div>
        </div>
      </section>

      {/* capabilities */}
      <section className="relative py-16 md:py-24">
        <div className="container-bx">
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
            {d.capabilitiesTitle}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {p.features.map((f, i) => (
              <Reveal key={f} delay={i * 70}>
                <div className="card-bx h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                      <Check size={16} className="text-cyan-glow" />
                    </span>
                    <span className="font-medium text-white">{f}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta dict={dict} lang={params.lang} />
    </>
  );
}
