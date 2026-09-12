import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Scheherazade_New, Markazi_Text } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// A business that started in 1985 and sells "unique cars" out of a domed
// rotunda earns a transitional serif rather than another grotesk — and the
// serif is set against a plain geometric sans so nothing turns antique.
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});
// Scheherazade New is a high-contrast naskh with real calligraphic weight —
// the Arabic answer to a didone, and the register a forty-year-old business
// earns. Qahiri was tried first and shaped badly at display size: its glyphs
// collided into an unreadable stack.
const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
});
// Markazi Text runs under it. Ruwudu was tried first and its Quranic medial
// forms actively misread at body size — a medial ayn came out as a heh.
const markazi = Markazi_Text({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-markazi",
});

export const metadata: Metadata = {
  title: "K.auto — Four decades of unique | Sheikh Zayed, Cairo",
  description:
    "Trading since 1985, out of a circular showroom under a domed ceiling — and carrying a roster that runs Lamborghini, Lotus, and a phone company.",
  metadataBase: new URL("https://k-auto-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "K.auto — Four decades of unique",
    description: "A dealership page built around the room: a turning dais under a dome.",
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#e4dbd9" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${dmSerif.variable} ${dmSans.variable} ${scheherazade.variable} ${markazi.variable}`}
    >
      <body className="bg-dome text-wall antialiased">
        {/* Content comes round under an intersection observer, so without
            scripting every block would stay at opacity 0. */}
        <noscript>
          <style>{`[data-round]{opacity:1!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
