import type { Metadata } from "next";
import { Inter, Space_Grotesk, Sora } from "next/font/google";
import "../globals.css";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { VersionTheme } from "@/components/VersionTheme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL("https://www.beyond-expertise.com"),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <VersionTheme />
        <ScrollProgress />
        <Header dict={dict} lang={params.lang} />
        <main className="relative z-[2]">{children}</main>
        <Footer dict={dict} lang={params.lang} />
      </body>
    </html>
  );
}
