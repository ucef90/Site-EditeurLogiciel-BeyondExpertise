import Link from "next/link";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

export function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const year = 2026;

  const columns = [
    {
      title: dict.footer.columns.products,
      links: dict.products.items.map((p) => ({
        label: p.name,
        href: `/${lang}/products`,
      })),
    },
    {
      title: dict.footer.columns.solutions,
      links: dict.pages.solutions.items.map((s) => ({
        label: s.name,
        href: `/${lang}/solutions`,
      })),
    },
    {
      title: dict.footer.columns.company,
      links: [
        { label: dict.footer.links.about, href: `/${lang}/company` },
        { label: dict.footer.links.contact, href: `/${lang}/contact` },
        { label: dict.footer.links.careers, href: `/${lang}/company` },
        { label: dict.footer.links.blog, href: `/${lang}#resources` },
      ],
    },
    {
      title: dict.footer.columns.legal,
      links: [
        { label: dict.footer.links.trust, href: `/${lang}/trust` },
        { label: dict.footer.links.privacy, href: `/${lang}/trust` },
        { label: dict.footer.links.terms, href: `/${lang}/trust` },
        { label: dict.footer.links.cookies, href: `/${lang}/trust` },
      ],
    },
  ];

  return (
    <footer className="relative z-[2] border-t border-white/[0.08] bg-ink-950">
      <div className="container-bx py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              {dict.footer.tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {dict.trust.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/55"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            © {year} Beyond Expertise. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/40">{dict.footer.language}</span>
            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      </div>
    </footer>
  );
}
