import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { PageHero } from "@/components/PageHero";
import { TrustHighlight, FinalCta } from "@/components/sections/HomeSections";

export default async function TrustPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const h = dict.pages.trust.hero;
  return (
    <>
      <PageHero tag={h.tag} title={h.title} subtitle={h.subtitle} />
      <TrustHighlight dict={dict} lang={params.lang} />
      <FinalCta dict={dict} lang={params.lang} />
    </>
  );
}
