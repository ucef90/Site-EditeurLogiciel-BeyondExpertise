import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Stats, FinalCta } from "@/components/sections/HomeSections";
import { Gem, ShieldCheck, Target, Rocket } from "lucide-react";

const icons = [Gem, ShieldCheck, Target, Rocket];

export default async function CompanyPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const c = dict.pages.company;
  return (
    <>
      <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} />

      <section className="py-16 md:py-24">
        <div className="container-bx">
          <Reveal className="mx-auto max-w-3xl">
            <div className="glass rounded-3xl p-8 md:p-12">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                {c.missionTitle}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/65">{c.missionBody}</p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map((v, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={v.title} delay={i * 70}>
                  <div className="card-bx h-full">
                    <Icon size={24} className="text-cyan-glow" />
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{v.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Stats dict={dict} />
      <FinalCta dict={dict} lang={params.lang} />
    </>
  );
}
