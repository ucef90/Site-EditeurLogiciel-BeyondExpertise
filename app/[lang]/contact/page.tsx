import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Globe, Clock } from "lucide-react";

export default async function ContactPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const c = dict.pages.contact;
  return (
    <>
      <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} />

      <section className="pb-24 md:pb-32">
        <div className="container-bx grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="glass rounded-3xl p-6 md:p-10">
            <ContactForm dict={dict} />
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-white">{c.infoTitle}</h2>
            <InfoRow icon={<Mail size={18} />} label="Email" value={c.email} />
            <InfoRow icon={<Globe size={18} />} label="Regions" value={c.regions} />
            <InfoRow icon={<Clock size={18} />} label="SLA" value="24 h" />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card-bx flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-cyan-glow">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
        <div className="text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}
