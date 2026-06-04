import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Industries, FinalCta } from "@/components/sections/HomeSections";
import { Bot, Database, Gauge, ShieldCheck, ArrowRight } from "lucide-react";

const icons = [Bot, Database, Gauge, ShieldCheck];

export default async function SolutionsPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const sol = dict.pages.solutions;
  return (
    <>
      <PageHero tag={sol.hero.tag} title={sol.hero.title} subtitle={sol.hero.subtitle} />

      <section className="py-16 md:py-24">
        <div className="container-bx grid gap-5 md:grid-cols-2">
          {sol.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.name} delay={i * 80}>
                <div className="card-bx group flex h-full flex-col">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon size={22} className="text-cyan-glow" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                  <ArrowRight
                    size={18}
                    className="mt-5 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-cyan-glow"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Industries dict={dict} />
      <FinalCta dict={dict} lang={params.lang} />
    </>
  );
}
