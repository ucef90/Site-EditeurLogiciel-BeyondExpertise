"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

export function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { label: dict.nav.products, href: `/${lang}/products` },
    { label: dict.nav.solutions, href: `/${lang}/solutions` },
    { label: dict.nav.industries, href: `/${lang}#industries` },
    { label: dict.nav.company, href: `/${lang}/company` },
    { label: dict.nav.trust, href: `/${lang}/trust` },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-bx flex h-16 items-center justify-between">
        <Link href={`/${lang}`} aria-label="Beyond Expertise" className="relative z-10">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher lang={lang} />
          <Link
            href={`/${lang}/contact`}
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            {dict.nav.login}
          </Link>
          <Link href={`/${lang}/contact`} className="btn-primary">
            {dict.nav.demo}
          </Link>
        </div>

        <button
          className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.nav.close : dict.nav.menu}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/[0.08] bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <div className="container-bx flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-4">
              <LanguageSwitcher lang={lang} />
              <Link href={`/${lang}/contact`} className="btn-primary">
                {dict.nav.demo}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
