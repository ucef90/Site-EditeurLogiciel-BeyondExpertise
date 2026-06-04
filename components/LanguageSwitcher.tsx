"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname() || `/${lang}`;

  const swapLocale = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-xs font-medium">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={swapLocale(loc)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            loc === lang ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
          }`}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
