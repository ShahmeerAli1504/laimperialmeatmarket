import type { Metadata, Viewport } from "next";
import { Cinzel, DM_Sans, Yellowtail } from "next/font/google";
import { IconSprite } from "@/components/icons";
import { LangProvider } from "@/components/lang";
import { Footer, Header, OrderBar, RevealOnScroll } from "@/components/site-chrome";
import { KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME, SITE_URL, ldJson, siteJsonLd } from "@/lib/site";
import "./globals.css";

// Self-hosted Google fonts. The font stacks themselves live in app/legacy.css (:root).
const cinzel = Cinzel({ subsets: ["latin", "latin-ext"], weight: ["600", "700", "800"], variable: "--font-cinzel", display: "swap", adjustFontFallback: false });
const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], axes: ["opsz"], variable: "--font-dm-sans", display: "swap", adjustFontFallback: false });
const yellowtail = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--font-yellowtail", display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "La Imperial Meat Market & Taqueria | Carnicería & Tacos in Winnemucca, NV",
    template: "%s | La Imperial Meat Market",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: "Nexora Digital",
  publisher: SITE_NAME,
  category: "food",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: true, address: true, email: false },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: ["es_US", "es_MX"],
    url: "/",
    title: "La Imperial Meat Market & Taqueria — Winnemucca, NV",
    description:
      "Fresh meat. Authentic flavor. Mexican tradition. Meat market, taquería, bakery and Mexican groceries at both Winnemucca stores.",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Imperial Meat Market & Taqueria — Winnemucca, NV",
    description: "Fresh-cut meats, street tacos, quesabirria, pan dulce and Mexican groceries. Two Winnemucca stores, open 7 days.",
  },
  appleWebApp: { title: SITE_SHORT_NAME, capable: true, statusBarStyle: "black-translucent" },
  other: {
    "geo.region": "US-NV",
    "geo.placename": "Winnemucca",
    "content-language": "en-US, es-US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0907",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${dmSans.variable} ${yellowtail.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(siteJsonLd)} />
        <LangProvider>
          <IconSprite />
          <Header />
          <main>{children}</main>
          <Footer />
          <OrderBar />
          <RevealOnScroll />
        </LangProvider>
      </body>
    </html>
  );
}
