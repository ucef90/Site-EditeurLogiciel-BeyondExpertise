import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import {
  LogoBar,
  Shift,
  Capabilities,
  HowItWorks,
  Industries,
  Stats,
  Testimonial,
  TrustHighlight,
  Resources,
  FinalCta,
} from "@/components/sections/HomeSections";

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <>
      <Hero dict={dict} lang={params.lang} />
      <LogoBar dict={dict} />
      <Shift dict={dict} />
      <Products dict={dict} />
      <Capabilities dict={dict} />
      <HowItWorks dict={dict} />
      <Industries dict={dict} />
      <Stats dict={dict} />
      <Testimonial dict={dict} />
      <TrustHighlight dict={dict} lang={params.lang} />
      <Resources dict={dict} lang={params.lang} />
      <FinalCta dict={dict} lang={params.lang} />
    </>
  );
}
