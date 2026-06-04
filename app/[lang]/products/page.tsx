import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { PageHero } from "@/components/PageHero";
import { Products } from "@/components/sections/Products";
import { Capabilities, FinalCta } from "@/components/sections/HomeSections";

export default async function ProductsPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const h = dict.pages.products.hero;
  return (
    <>
      <PageHero tag={h.tag} title={h.title} subtitle={h.subtitle} />
      <Products dict={dict} withHeader={false} />
      <Capabilities dict={dict} />
      <FinalCta dict={dict} lang={params.lang} />
    </>
  );
}
