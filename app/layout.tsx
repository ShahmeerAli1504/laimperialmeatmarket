import type { Metadata, Viewport } from "next";
import { Cinzel, DM_Sans, Yellowtail } from "next/font/google";
import { IconSprite } from "@/components/icons";
import { LangProvider } from "@/components/lang";
import { Footer, Header, OrderBar, RevealOnScroll } from "@/components/site-chrome";
import "./globals.css";

// Self-hosted Google fonts. The font stacks themselves live in app/legacy.css (:root).
const cinzel = Cinzel({ subsets: ["latin", "latin-ext"], weight: ["600", "700", "800"], variable: "--font-cinzel", display: "swap", adjustFontFallback: false });
const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], axes: ["opsz"], variable: "--font-dm-sans", display: "swap", adjustFontFallback: false });
const yellowtail = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--font-yellowtail", display: "swap", adjustFontFallback: false });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "La Imperial Meat Market & Taqueria | Winnemucca, NV",
  description:
    "Fresh-cut meats, authentic tacos, pan dulce and Mexican groceries — two Winnemucca, NV locations. Carnicería, taquería, panadería y abarrotes. Order on DoorDash.",
  icons: { icon: { url: "/icon.png", type: "image/png" }, apple: "/apple-icon.png" },
  openGraph: {
    type: "website",
    title: "La Imperial Meat Market & Taqueria — Winnemucca, NV",
    description:
      "Fresh meat. Authentic flavor. Mexican tradition. Meat market, taqueria, bakery and groceries at both Winnemucca stores.",
    images: ["/images/banner-meats.webp"],
  },
};

export const viewport: Viewport = { themeColor: "#0d0907" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${dmSans.variable} ${yellowtail.variable}`}>
      <body>
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
